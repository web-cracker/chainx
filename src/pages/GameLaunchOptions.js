import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Title } from '@telegram-apps/telegram-ui';

const GameLaunchOptions = () => {
  const navigate = useNavigate();

  const handleSinglePlayerClick = () => {
    navigate('/quiz');
  };

  const handleMultiplayerClick = () => {
    navigate('/multiplayer');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'black', display: 'flex',
      flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', textAlign: 'center',
      padding: '20px',
    }}>
      <div style={{ marginBottom: '20px' }}>
        <Title
          level="1"
          style={{
            color: 'white',
            fontFamily: "'Poppins', sans-serif",
            fontSize: window.innerWidth < 600 ? '24px' : '32px',
            textAlign: 'center',
            marginBottom: '8px'
          }}
        >
          Choose Game Mode
        </Title>
      </div>

      <div style={{ display: 'flex', flexDirection: window.innerWidth < 600 ? 'column' : 'row', gap: '20px' }}>
        <Button
          onClick={handleSinglePlayerClick}
          style={{
            backgroundColor: '#007AFF',
            color: 'white',
            borderRadius: '12px',
            padding: '15px 30px',
            fontSize: '18px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0, 122, 255, 0.4)',
            transition: 'all 0.3s ease',
          }}
        >
          Single Player
        </Button>
        <Button
          onClick={handleMultiplayerClick}
          style={{
            backgroundColor: '#FF9500',
            color: 'white',
            borderRadius: '12px',
            padding: '15px 30px',
            fontSize: '18px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(255, 149, 0, 0.4)',
            transition: 'all 0.3s ease',
          }}
        >
          Multiplayer
        </Button>
        <Button
          onClick={() => navigate('/')} // Navigate back to home
          style={{
            backgroundColor: '#555',
            color: 'white',
            borderRadius: '12px',
            padding: '15px 30px',
            fontSize: '18px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default GameLaunchOptions;
