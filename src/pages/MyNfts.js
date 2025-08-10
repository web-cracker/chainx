import { useState, useEffect } from 'react';
import { Button, Title, Card, Text } from '@telegram-apps/telegram-ui';
import { useNavigate, useLocation } from 'react-router-dom';
import bronze from '../assets/bronze.png';
import silver from '../assets/silver.png';
import gold from '../assets/gold.png';
import platinum from '../assets/platinum.png';

const allNfts = [
  { id: 1, name: 'Bronze Trophy', cost: 100, image: bronze },
  { id: 2, name: 'Silver Trophy', cost: 200, image: silver },
  { id: 3, name: 'Gold Trophy', cost: 300, image: gold },
  { id: 4, name: 'Platinum Trophy', cost: 400, image: platinum },
];

const MyNfts = () => {
  const [myNfts, setMyNfts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const ownedNftIds = JSON.parse(localStorage.getItem('ownedNfts')) || [];
    const ownedNftsFull = ownedNftIds.map(nftId => allNfts.find(nft => nft.id === nftId)).filter(Boolean);
    setMyNfts(ownedNftsFull);
  }, [location.key]);

  const handleTransfer = (nftToTransfer) => {
    // Remove NFT from ownedNfts
    const ownedNftIds = JSON.parse(localStorage.getItem('ownedNfts')) || [];
    const updatedOwnedNftIds = ownedNftIds.filter(id => id !== nftToTransfer.id);
    localStorage.setItem('ownedNfts', JSON.stringify(updatedOwnedNftIds));
    setMyNfts(prevNfts => prevNfts.filter(nft => nft.id !== nftToTransfer.id));

    // Add NFT to walletNfts
    const walletNftIds = JSON.parse(localStorage.getItem('walletNfts')) || [];
    const updatedWalletNftIds = [...walletNftIds, nftToTransfer.id];
    localStorage.setItem('walletNfts', JSON.stringify(updatedWalletNftIds));

    alert(`NFT ${nftToTransfer.name} transferred to your wallet!`);
  };

  return (
    <div style={{
      background: 'black',
      padding: '40px',
      minHeight: '100vh',
      position: 'relative', // Added for positioning the back button
    }}>
      <Button 
        onClick={() => navigate(-1)} 
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          backgroundColor: 'transparent',
          color: 'white',
          border: 'none',
          fontSize: '30px',
          cursor: 'pointer',
          padding: '0',
        }}
      >
        &#8592; {/* Left arrow character */}
      </Button>
      <Title level="1" style={{ color: 'white', textAlign: 'center', marginBottom: '40px' }}>My NFTs</Title>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {myNfts.length > 0 ? (
          myNfts.map((nft) => (
            <Card key={nft.id} style={{ background: '#1c1c1e', padding: '20px', borderRadius: '20px', textAlign: 'center' }}>
              <img 
                src={nft.image || 'https://via.placeholder.com/150?text=No+Image'} 
                alt={nft.name} 
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '15px', marginBottom: '20px', border: '2px solid red' }} 
              />
              <Text style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>{nft.name}</Text>
              <Button onClick={() => handleTransfer(nft)} style={{ background: '#007AFF', color: 'white', borderRadius: '12px', marginTop: '20px' }}>
                Transfer
              </Button>
            </Card>
          ))
        ) : (
          <Text style={{ color: 'white', textAlign: 'center', gridColumn: '1 / -1' }}>You don't own any NFTs yet. Redeem some!</Text>
        )}
      </div>
    </div>
  );
};

export default MyNfts;