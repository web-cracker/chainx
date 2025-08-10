import { useState, useEffect } from 'react';
import { Title, Card, Text } from '@telegram-apps/telegram-ui';
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

const WalletNfts = () => {
  const [walletNfts, setWalletNfts] = useState([]);

  useEffect(() => {
    const storedWalletNftIds = JSON.parse(localStorage.getItem('walletNfts')) || [];
    const walletNftsFull = storedWalletNftIds.map(nftId => allNfts.find(nft => nft.id === nftId)).filter(Boolean);
    setWalletNfts(walletNftsFull);
  }, []);

  return (
    <div style={{
      background: 'black',
      padding: '40px',
      minHeight: '100vh',
    }}>
      <Title level="1" style={{ color: 'white', textAlign: 'center', marginBottom: '40px' }}>My Wallet NFTs</Title>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {walletNfts.length > 0 ? (
          walletNfts.map((nft) => (
            <Card key={nft.id} style={{ background: '#1c1c1e', padding: '20px', borderRadius: '20px', textAlign: 'center' }}>
              <img src={nft.image} alt={nft.name} style={{ width: '100%', borderRadius: '15px', marginBottom: '20px' }} />
              <Text style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>{nft.name}</Text>
            </Card>
          ))
        ) : (
          <Text style={{ color: 'white', textAlign: 'center', gridColumn: '1 / -1' }}>No NFTs in your wallet yet.</Text>
        )}
      </div>
    </div>
  );
};

export default WalletNfts;
