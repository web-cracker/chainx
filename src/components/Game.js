import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Game.css'; // We will create this file for styling

// Connect to your backend server URL
const socket = io("http://localhost:5001");

const CATEGORIES = ["Science", "History", "Web3 General", "DeFi", "NFTs", "Blockchain Fundamentals"];

export default function Game({ session }) {
    const [gameState, setGameState] = useState('home'); // States: home, matching, game, gameover
    const [gameData, setGameData] = useState(null);
    const [question, setQuestion] = useState(null);
    const [result, setResult] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    // Effect to manage all real-time socket events
    useEffect(() => {
        socket.on('connect', () => console.log("Connected to server!"));
        socket.on('matchFound', (data) => {
            setGameData(data);
            setGameState('game');
        });
        socket.on('newQuestion', (data) => {
            setResult(null);
            setSelectedAnswer(null);
            setQuestion(data);
        });
        socket.on('roundResult', (data) => {
            setResult(data);
        });
        socket.on('gameOver', (data) => {
            setResult(data);
            setGameState('gameover');
        });

        // Cleanup listeners on component unmount
        return () => {
            socket.off('connect');
            socket.off('matchFound');
            socket.off('newQuestion');
            socket.off('roundResult');
            socket.off('gameOver');
        };
    }, []);

    const handleCategorySelect = (category) => {
        // Send the user's Supabase ID to the server
        socket.emit('joinQueue', { category, userId: session.user.id });
        setGameState('matching');
    };

    const handleAnswerSubmit = (answer) => {
        if (selectedAnswer === null) { // Prevent changing answer
            setSelectedAnswer(answer);
            socket.emit('submitAnswer', { roomId: gameData.roomId, answer });
        }
    };

    const handlePlayAgain = () => {
        setGameState('home');
        setGameData(null);
        setQuestion(null);
        setResult(null);
    };

    // --- Render Functions for Different UI States ---

    const renderHome = () => (
        <div className="card">
            <h2>Multiplayer Quiz</h2>
            <p>Select a category to find an opponent and test your knowledge!</p>
            <div className="category-buttons">
                {CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => handleCategorySelect(cat)}>
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );

    const renderMatching = () => (
        <div className="card">
            <h2>Finding Opponent...</h2>
            <div className="spinner"></div>
            <p>Please wait while we find a worthy adversary.</p>
        </div>
    );

    const renderGame = () => {
        if (!question) return <div className="card"><h2>Waiting for game to start...</h2></div>;

        return (
            <div className="card">
                <h2>Question {question.index + 1}</h2>
                <p className="question-text">{question.question.text}</p>
                <div className="options-grid">
                    {question.question.options.map((opt, i) => {
                        let buttonClass = '';
                        if (result) { // After the round ends
                            if (opt === result.correctAnswer) buttonClass = 'correct';
                            else if (opt === selectedAnswer) buttonClass = 'wrong';
                        } else if (opt === selectedAnswer) { // During the round, after selection
                            buttonClass = 'selected';
                        }
                        
                        return (
                            <button
                                key={i}
                                className={buttonClass}
                                onClick={() => handleAnswerSubmit(opt)}
                                disabled={selectedAnswer !== null}
                            >
                                {opt}
                            </button>
                        );
                    })}
                </div>
                {result && <div className="result-text">Next round starting soon...</div>}
            </div>
        );
    };

    const renderGameOver = () => (
        <div className="card">
            <h2>Game Over!</h2>
            {result && result.winner ? (
                <h3>🎉 Winner: User {result.winner.slice(0, 8)}... 🎉</h3>
            ) : (
                <h3>It's a Draw!</h3>
            )}
            <p>Check the leaderboard to see your new rank!</p>
            <button onClick={handlePlayAgain} className="play-again-btn">Play Again</button>
        </div>
    );

    const renderContent = () => {
        switch(gameState) {
            case 'matching': return renderMatching();
            case 'game': return renderGame();
            case 'gameover': return renderGameOver();
            case 'home':
            default:
                return renderHome();
        }
    };

    return <div className="game-container">{renderContent()}</div>;
}