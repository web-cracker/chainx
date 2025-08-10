import { useParams, useNavigate } from 'react-router-dom';
import { Button, Title, Text, Card, Subheadline } from '@telegram-apps/telegram-ui';
import bronze from '../assets/bronze.png';
import silver from '../assets/silver.png';
import gold from '../assets/gold.png';
import platinum from '../assets/platinum.png';
import { useState, useEffect } from 'react';

const nfts = [
  { id: 1, name: 'Bronze Trophy', cost: 100, image: bronze, description: 'A symbol of your first steps into the Web3 world.' },
  { id: 2, name: 'Silver Trophy', cost: 200, image: silver, description: 'Awarded for your growing expertise in decentralized technologies.' },
  { id: 3, name: 'Gold Trophy', cost: 300, image: gold, description: 'A testament to your mastery of the blockchain.' },
  { id: 4, name: 'Platinum Trophy', cost: 400, image: platinum, description: 'The ultimate recognition for a true Web3 pioneer.' },
];

const RedeemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const nft = nfts.find((n) => n.id === parseInt(id));
  const [userPoints, setUserPoints] = useState(0);
  const [canRedeem, setCanRedeem] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

  useEffect(() => {
    const storedPoints = parseInt(localStorage.getItem('userPoints')) || 0;
    setUserPoints(storedPoints);
    if (nft) {
      const ownedNfts = JSON.parse(localStorage.getItem('ownedNfts')) || [];
      setCanRedeem(storedPoints >= nft.cost && !ownedNfts.includes(nft.id));
    }
  }, [nft]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRedeem = () => {
    if (canRedeem) {
      const newPoints = userPoints - nft.cost;
      localStorage.setItem('userPoints', newPoints);
      setUserPoints(newPoints);

      const ownedNfts = JSON.parse(localStorage.getItem('ownedNfts')) || [];
      const newOwnedNfts = [...ownedNfts, nft.id]; // Store only the NFT ID
      localStorage.setItem('ownedNfts', JSON.stringify(newOwnedNfts));

      alert(`NFT ${nft.name} redeemed successfully!`);
      navigate('/my-nfts');
    } else {
      alert('Insufficient points to redeem this NFT. Play more quizzes!');
    }
  };

  if (!nft) {
    return <Text style={{ color: 'white', textAlign: 'center' }}>NFT not found</Text>;
  }

  return (
    <div style={{
      background: 'black',
      padding: isSmallScreen ? '20px' : '40px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Card style={{ background: '#1c1c1e', padding: isSmallScreen ? '20px' : '40px', borderRadius: '20px', textAlign: 'center', maxWidth: isSmallScreen ? '90%' : '600px', border: '1px solid #333' }}>
        <Title level="1" style={{ color: 'white', marginBottom: isSmallScreen ? '15px' : '25px', fontSize: isSmallScreen ? '26px' : '36px' }}>Redeem NFT</Title>
        <img src={nft.image} alt={nft.name} style={{ width: isSmallScreen ? '50%' : '70%', maxWidth: isSmallScreen ? '120px' : '200px', borderRadius: '15px', marginBottom: isSmallScreen ? '25px' : '35px', boxShadow: '0 0 20px rgba(0, 122, 255, 0.5)' }} />
        <Subheadline level="2" style={{ color: 'white', marginBottom: isSmallScreen ? '8px' : '15px', fontSize: isSmallScreen ? '20px' : '28px' }}>{nft.name}</Subheadline>
        <Text style={{ color: '#a0a0a0', marginBottom: isSmallScreen ? '15px' : '25px', fontSize: isSmallScreen ? '13px' : '16px', lineHeight: '1.4', display: 'block' }}>{nft.description}</Text>
        <Text style={{ color: '#FFD700', fontSize: isSmallScreen ? '22px' : '30px', fontWeight: 'bold', marginBottom: isSmallScreen ? '15px' : '25px', display: 'block' }}>Cost: {nft.cost} Points</Text>
        <Text style={{ color: 'white', fontSize: isSmallScreen ? '15px' : '18px', display: 'block' }}>Your current points: {userPoints}</Text>
        <Button 
          onClick={handleRedeem} 
          disabled={!canRedeem}
          style={{
            backgroundColor: canRedeem ? '#007AFF' : '#555',
            color: 'white',
            borderRadius: '15px',
            padding: isSmallScreen ? '12px 25px' : '20px 40px',
            fontSize: isSmallScreen ? '16px' : '20px',
            fontWeight: 'bold',
            border: 'none',
            cursor: canRedeem ? 'pointer' : 'not-allowed',
            boxShadow: canRedeem ? '0 5px 20px rgba(0, 122, 255, 0.4)' : 'none',
            transition: 'all 0.3s ease',
            marginTop: isSmallScreen ? '25px' : '35px', // Added margin to separate from previous text
          }}
        >
          {canRedeem ? 'Confirm Redemption' : 'Insufficient Points'}
        </Button>
        <Button 
          onClick={() => navigate(-1)} 
          style={{
            backgroundColor: 'transparent',
            color: '#007AFF',
            border: 'none',
            marginTop: isSmallScreen ? '15px' : '25px',
            fontSize: isSmallScreen ? '13px' : '16px',
            cursor: 'pointer',
          }}
        >
          Go Back
        </Button>
      </Card>
    </div>
  );
};

export default RedeemDetails;
