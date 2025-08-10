import { useNavigate } from 'react-router-dom';
import { Button, Title, Card, Text } from '@telegram-apps/telegram-ui';
import bronze from '../assets/bronze.png';
import silver from '../assets/silver.png';
import gold from '../assets/gold.png';
import platinum from '../assets/platinum.png';
import { useState, useEffect } from 'react';

const allNfts = [
  { id: 1, name: 'Bronze Trophy', cost: 100, image: bronze },
  { id: 2, name: 'Silver Trophy', cost: 200, image: silver },
  { id: 3, name: 'Gold Trophy', cost: 300, image: gold },
  { id: 4, name: 'Platinum Trophy', cost: 400, image: platinum },
];

const Redeem = () => {
  const navigate = useNavigate();
  const [userPoints, setUserPoints] = useState(0);
  const [availableNfts, setAvailableNfts] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

  useEffect(() => {
    const storedPoints = parseInt(localStorage.getItem('userPoints')) || 0;
    setUserPoints(storedPoints);

    const ownedNfts = JSON.parse(localStorage.getItem('ownedNfts')) || [];
    const redeemedNftIds = new Set(ownedNfts.map(nft => nft.id));
    const filteredNfts = allNfts.filter(nft => !redeemedNftIds.has(nft.id));
    setAvailableNfts(filteredNfts);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{
      background: 'black',
      padding: isSmallScreen ? '20px' : '40px',
      minHeight: '100vh',
      position: 'relative', // Added for positioning the back button
    }}>
      <Button 
        onClick={() => navigate('/')} 
        style={{
          position: 'absolute',
          top: isSmallScreen ? '10px' : '20px',
          left: isSmallScreen ? '10px' : '20px',
          backgroundColor: 'transparent',
          color: 'white',
          border: 'none',
          fontSize: isSmallScreen ? '24px' : '30px',
          cursor: 'pointer',
          padding: '0',
        }}
      >
        &#8592; {/* Left arrow character */}
      </Button>
      <Title level="1" style={{ color: 'white', textAlign: 'center', marginBottom: isSmallScreen ? '20px' : '40px', fontSize: isSmallScreen ? '28px' : '36px' }}>Redeem NFTs</Title>
      <Text style={{ color: 'white', textAlign: 'center', marginBottom: isSmallScreen ? '10px' : '20px', fontSize: isSmallScreen ? '16px' : '20px' }}>Your Points: {userPoints}</Text>
      <div style={{ display: 'grid', gridTemplateColumns: isSmallScreen ? '1fr' : 'repeat(auto-fill, minmax(250px, 1fr))', gap: isSmallScreen ? '15px' : '20px' }}>
        {availableNfts.length > 0 ? (
          availableNfts.map((nft) => {
            const canRedeem = userPoints >= nft.cost;
            return (
              <Card key={nft.id} style={{ background: '#1c1c1e', padding: '20px', borderRadius: '20px', textAlign: 'center' }}>
                <img src={nft.image} alt={nft.name} style={{ width: '100%', borderRadius: '15px', marginBottom: '20px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
                  <Text style={{ color: 'white', fontSize: isSmallScreen ? '18px' : '20px', fontWeight: 'bold' }}>{nft.name}</Text>
                  <Text style={{ color: '#FFD700', fontSize: isSmallScreen ? '16px' : '18px' }}>{nft.cost} Points</Text>
                </div>
                <Button 
                  onClick={() => navigate(`/redeem/${nft.id}`)} 
                  disabled={!canRedeem}
                  style={{
                    backgroundColor: canRedeem ? '#007AFF' : '#555',
                    color: 'white',
                    borderRadius: '12px',
                    padding: isSmallScreen ? '10px 20px' : '15px 30px',
                    fontSize: isSmallScreen ? '16px' : '18px',
                    fontWeight: 'bold',
                    border: 'none',
                    cursor: canRedeem ? 'pointer' : 'not-allowed',
                    boxShadow: canRedeem ? '0 4px 15px rgba(0, 122, 255, 0.4)' : 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {canRedeem ? 'Redeem' : 'Insufficient Points'}
                </Button>
              </Card>
            );
          })
        ) : (
          <Text style={{ color: 'white', textAlign: 'center', gridColumn: '1 / -1' }}>All NFTs redeemed!</Text>
        )}
      </div>
    </div>
  );
};

export default Redeem;
