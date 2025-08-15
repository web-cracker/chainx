import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Title, Subheadline, Card, Progress } from '@telegram-apps/telegram-ui';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// WARNING: Storing API keys in client-side code is insecure.
// Use environment variables in production.
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `
        Generate 5 multiple-choice quiz questions about blockchain and Web3.
        Each question should be in JSON format:
        [
          {
            "question": "string",
            "options": ["string", "string", "string", "string"],
            "correctAnswer": "string",
            "explanation": "string"
          }
        ]
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        
        const jsonResponse = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsedQuestions = JSON.parse(jsonResponse);
        setQuestions(parsedQuestions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
    sessionStorage.removeItem('quizPointsAdded');
  }, []);

  const handleAnswer = (answer) => {
    if (showExplanation) return;

    const correctAnswer = questions[currentQuestion].correctAnswer;
    const isAnswerCorrect = answer === correctAnswer;
    let updatedScore = score;

    setSelectedAnswer(answer);
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      updatedScore = score + 1;
      setScore(updatedScore);
    }

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setSelectedAnswer(null);
    setIsCorrect(null);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      navigate('/dashboard', { state: { score: score, quizCompleted: true } });
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <Loader style={styles.loader} />
        <Title level="1" style={styles.title}>Loading Quiz...</Title>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <Title level="1" style={styles.title}>Error</Title>
        <Subheadline style={{ color: '#dc3545' }}>{error}</Subheadline>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div style={styles.container}>
        <Title level="1" style={styles.title}>No quiz questions available.</Title>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  return (
    <div style={styles.container}>
      <Title level="1" style={styles.title}>AVA Quiz</Title>
      <Card style={styles.card}>
        <Progress value={progress} style={{ marginBottom: '30px' }} />
        <Subheadline level="1" style={styles.question}>{currentQ.question}</Subheadline>
        <div style={styles.optionsGrid}>
          {currentQ.options.map((option) => {
            const isSelected = selectedAnswer === option;
            const isTheCorrectAnswer = currentQ.correctAnswer === option;

            let buttonStyle = { ...styles.button };
            if (showExplanation) {
              if (isTheCorrectAnswer) {
                buttonStyle = { ...buttonStyle, ...styles.correctAnswer };
              } else if (isSelected && !isCorrect) {
                buttonStyle = { ...buttonStyle, ...styles.incorrectAnswer };
              } else {
                buttonStyle = { ...buttonStyle, ...styles.disabledButton };
              }
            }

            return (
              <Button
                key={option}
                onClick={() => handleAnswer(option)}
                style={buttonStyle}
                disabled={showExplanation}
              >
                {option}
                {showExplanation && isTheCorrectAnswer && <CheckCircle style={styles.icon} />}
                {showExplanation && isSelected && !isCorrect && <XCircle style={styles.icon} />}
              </Button>
            );
          })}
        </div>
        {showExplanation && (
          <div style={styles.explanationContainer}>
            <Subheadline style={{ color: isCorrect ? '#28a745' : '#dc3545', fontWeight: 'bold' }}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </Subheadline>
            <p style={{ color: 'white' }}>{currentQ.explanation}</p>
            <Button onClick={handleNextQuestion} style={styles.nextButton}>
              {currentQuestion + 1 < questions.length ? 'Next Question' : 'Finish Quiz'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

const styles = {
  container: {
    background: 'linear-gradient(135deg, #1a1a1a, #000000)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '20px',
    minHeight: '100vh',
    color: 'white',
  },
  title: {
    color: 'white',
    marginBottom: '30px',
    fontSize: '32px',
    fontWeight: 'bold',
  },
  card: {
    background: '#1c1c1e',
    padding: '30px',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '600px',
    border: '1px solid #333',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
  },
  question: {
    color: 'white',
    marginBottom: '30px',
    fontSize: '24px',
    minHeight: '60px',
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '15px',
  },
  button: {
    backgroundColor: '#007AFF',
    color: 'white',
    borderRadius: '12px',
    padding: '18px',
    fontSize: '18px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  },
  correctAnswer: {
    backgroundColor: '#28a745',
    boxShadow: '0 0 15px rgba(40, 167, 69, 0.7)',
  },
  incorrectAnswer: {
    backgroundColor: '#dc3545',
    boxShadow: '0 0 15px rgba(220, 53, 69, 0.7)',
  },
  disabledButton: {
    backgroundColor: '#333',
    color: '#888',
    cursor: 'not-allowed',
  },
  icon: {
    width: '24px',
    height: '24px',
  },
  explanationContainer: {
    marginTop: '20px',
    padding: '15px',
    borderRadius: '12px',
    backgroundColor: '#2a2a2e',
  },
  nextButton: {
    marginTop: '15px',
    backgroundColor: '#FF9500',
    color: 'white',
    fontWeight: 'bold',
  },
  loader: {
    width: '48px',
    height: '48px',
    color: 'white',
    animation: 'spin 1s linear infinite',
  },
};

export default Quiz;
