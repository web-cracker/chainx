// Load environment variables from the .env file
require('dotenv').config();

// Import necessary libraries
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// --- Initial Setup ---
const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing
const server = http.createServer(app);

// Connect to your Supabase project
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyDbxrkNvJ_RxQ9gGquOxu4VRpk-VyO8S2U');

// Setup Socket.io with CORS policies
const io = new Server(server, {
  cors: {
    origin: "*", // In production, restrict this to your frontend URL, e.g., "http://localhost:5173"
    methods: ["GET", "POST"]
  }
});

// --- In-Memory Game State Management ---
// These will be reset every time the server restarts
const waitingPlayers = {}; // Structure: { "category": [{socket, userId}, ...] }
const gameRooms = {};      // Structure: { "roomId": { players: [{id, userId}], ... } }

// Function to generate questions using Gemini API
async function generateQuestions(category) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `Generate 5 unique multiple-choice quiz questions about "${category}". Each question should have a "text", an "options" array (4 options), and an "answer" (one of the options). The output should be a JSON array of question objects. Example: [{ "text": "Question 1", "options": ["A", "B", "C", "D"], "answer": "A" }]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Attempt to parse the JSON, handling cases where the model might include extra text
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
    let questions;
    if (jsonMatch && jsonMatch[1]) {
      questions = JSON.parse(jsonMatch[1]);
    } else {
      // If no code block, try to parse the whole text
      questions = JSON.parse(text);
    }
    
    console.log(`Generated questions for ${category}:`, questions);
    return questions;
  } catch (error) {
    console.error("Error generating questions from Gemini API:", error);
    return []; // Return empty array on error
  }
}

// --- Socket.io Connection Logic ---
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Event listener for a player joining the matchmaking queue
  socket.on('joinQueue', ({ category, userId }) => {
    if (!userId) return; // Ignore if no user ID is provided

    console.log(`Socket ${socket.id} (User: ${userId}) is queuing for: ${category}`);
    if (!waitingPlayers[category]) {
      waitingPlayers[category] = [];
    }
    
    // Add the player to the queue for their chosen category
    waitingPlayers[category].push({ socket, userId });

    // If there are at least two players waiting, start a match
    if (waitingPlayers[category].length >= 2) {
      const player1Data = waitingPlayers[category].shift();
      const player2Data = waitingPlayers[category].shift();
      startMatch(player1Data, player2Data, category);
    }
  });

  // Event listener for a player submitting an answer
  socket.on('submitAnswer', ({ roomId, answer }) => {
    const room = gameRooms[roomId];
    if (!room) return;

    const player = room.players.find(p => p.id === socket.id);
    if (!room.answers[room.currentQuestionIndex]) {
       room.answers[room.currentQuestionIndex] = {};
    }
    
    // Record the player's answer for the current question
    if (player && room.answers[room.currentQuestionIndex][socket.id] === undefined) {
      room.answers[room.currentQuestionIndex][socket.id] = answer;
    }
  });

  // Event listener for when a user disconnects
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    // Remove the player from any queue they might be in
    for (const category in waitingPlayers) {
      waitingPlayers[category] = waitingPlayers[category].filter(p => p.socket.id !== socket.id);
    }
    // Note: You could also add logic here to handle a player disconnecting mid-game
  });
});

// --- Game Logic Functions ---

async function startMatch(player1Data, player2Data, category) {
  const roomId = `${player1Data.socket.id}-${player2Data.socket.id}`;
  console.log(`Starting match in room ${roomId} for category ${category}`);

  // Generate questions for the category
  const generatedQuestions = await generateQuestions(category);

  // Create a new game room with all necessary data
  gameRooms[roomId] = {
    players: [
      { id: player1Data.socket.id, userId: player1Data.userId },
      { id: player2Data.socket.id, userId: player2Data.userId }
    ],
    category,
    questions: generatedQuestions.length > 0 ? generatedQuestions : [], // No fallback to sample questions
    currentQuestionIndex: 0,
    scores: { [player1Data.socket.id]: 0, [player2Data.socket.id]: 0 },
    answers: {},
    interval: null
  };

  // Have both players join the Socket.io room
  player1Data.socket.join(roomId);
  player2Data.socket.join(roomId);
  
  // Notify both players that a match has been found
  io.to(roomId).emit('matchFound', { roomId, players: [player1Data.userId, player2Data.userId] });
  
  // Send the first question
  sendQuestion(roomId);
}
  function sendQuestion(roomId) {
  const room = gameRooms[roomId];
  if (!room) return;
  
  const questionIndex = room.currentQuestionIndex;
  
  // If there are no more questions, end the game
  if (questionIndex >= room.questions.length) {
    endGame(roomId);
    return;
  }
  
  const question = room.questions[questionIndex];
  const questionData = {
      text: question.text,
      options: question.options
  };

  // Send the new question to both players in the room
  io.to(roomId).emit('newQuestion', { question: questionData, index: questionIndex });

  // Start a 5-second timer for the question
  room.interval = setTimeout(() => {
    evaluateAnswers(roomId);
  }, 5000);
}

function evaluateAnswers(roomId) {
    const room = gameRooms[roomId];
    if (!room) return;

    clearTimeout(room.interval); // Stop the timer
    
    const question = room.questions[room.currentQuestionIndex];
    const playerAnswers = room.answers[room.currentQuestionIndex] || {};

    // Award points for correct answers
    for (const player of room.players) {
        if(playerAnswers[player.id] && playerAnswers[player.id] === question.answer) {
            room.scores[player.id] += 10;
        }
    }

    // Send the results of the round to both players
    io.to(roomId).emit('roundResult', { scores: room.scores, correctAnswer: question.answer });
    
    // Move to the next question after a 2-second delay
    setTimeout(() => {
        room.currentQuestionIndex++;
        sendQuestion(roomId);
    }, 2000);
}

// server.js -> Replace the existing endGame function with this one

async function endGame(roomId) {
    console.log(`--- GAME OVER for room: ${roomId} ---`); // <-- ADD THIS LINE

    const room = gameRooms[roomId];
    if (!room) {
        console.error("endGame called but room not found!"); // <-- ADD THIS LINE
        return;
    }

    const [player1, player2] = room.players;
    const score1 = room.scores[player1.id];
    const score2 = room.scores[player2.id];

    let winner, loser;
    if (score1 > score2) {
        winner = player1;
        loser = player2;
    } else if (score2 > score1) {
        winner = player2;
        loser = player1;
    } else { // It's a draw
        console.log("Match was a draw. Not saving to DB."); // <-- ADD THIS LINE
        io.to(roomId).emit('gameOver', { winner: null, scores: room.scores });
        delete gameRooms[roomId];
        return;
    }

    // Notify players of the game over state
    io.to(roomId).emit('gameOver', { winner: winner.userId, scores: room.scores });

    // Prepare the data to be saved
    const battleResultData = {
        winner_id_in: winner.userId,
        loser_id_in: loser.userId,
        category_in: room.category,
        winner_score_in: room.scores[winner.id],
        loser_score_in: room.scores[loser.id]
    };

    console.log("Attempting to save battle result:", battleResultData); // <-- ADD THIS LINE

    // Call the Supabase database function to update coins and log the battle
    const { error } = await supabase.rpc('handle_battle_result', battleResultData);

    if (error) {
        // This is the most important part! We need to see this error.
        console.error('--- SUPABASE ERROR ---'); // <-- ADD THIS LINE
        console.error(error); // <-- ADD THIS LINE
        console.error('--- END SUPABASE ERROR ---'); // <-- ADD THIS LINE
    } else {
        console.log(`✅ Battle result saved successfully for room ${roomId}`); // <-- ADD THIS LINE
    }

    // Clean up the room from memory
    delete gameRooms[roomId];
}

// --- Start the Server ---
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));