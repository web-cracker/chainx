import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Title, Subheadline, Input } from '@telegram-apps/telegram-ui';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique request IDs
import RedeemAvax from './RedeemAvax'; // Import RedeemAvax component
import { useWeb3Modal } from '@web3modal/wagmi/react'; // Import useWeb3Modal
import { supabase } from '../services/supabase'; // Import supabase
import { useAccount } from 'wagmi'; // Import useAccount for wagmi connection status
import './ProfileModal.css'; // Import the CSS file
import { FaGift, FaWallet, FaCoins, FaUserCircle, FaSignOutAlt, FaArrowLeft, FaExchangeAlt, FaTimes } from 'react-icons/fa';
import Leaderboard from './Leaderboard';

const ProfileModal = ({ user, onClose }) => {
  const navigate = useNavigate();
  const { open } = useWeb3Modal(); // Initialize useWeb3Modal
  const { isConnected: isWagmiConnected } = useAccount(); // Get wagmi connection status

  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [totalPoints, setTotalPoints] = useState(0);
  const [showRedeemAvax, setShowRedeemAvax] = useState(false); // State for RedeemAvax section

  useEffect(() => {
    const storedPoints = parseInt(localStorage.getItem('userPoints')) || user.coins || 0;
    setTotalPoints(storedPoints);
  }, [user.coins]);

  const handleConvert = async () => {
    const amountToConvert = parseInt(amount);

    if (isNaN(amountToConvert) || amountToConvert <= 0) {
      setMessage('Error: Please enter a valid amount.');
      return;
    }

    if (amountToConvert < 50) {
      setMessage('Error: Minimum conversion amount is 50 points.');
      return;
    }

    if (amountToConvert > totalPoints) {
      setMessage('Error: You do not have enough points.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const requestId = uuidv4(); // Generate a unique request ID

      console.log('Sending userId:', user.id); // Added for debugging

      const response = await fetch('http://localhost:5001/api/convert-points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          pointsToConvert: amountToConvert,
          requestId: requestId, // Send the unique request ID
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Conversion failed.');
      }

      // Update points in UI and local storage
      const newTotalPoints = data.newTotalPoints;
      setTotalPoints(newTotalPoints);
      localStorage.setItem('userPoints', newTotalPoints.toString());

      setMessage(`Conversion successful! Tx: ${data.txHash ? data.txHash.substring(0, 10) + '...' : data.message}`);
      setAmount(''); // Clear the input field

    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        {showRedeemAvax ? (
          <>
            <div className="header">
              <Button onClick={() => setShowRedeemAvax(false)} className="back-button">
                <FaArrowLeft style={{ marginRight: '8px' }} /> Back to Profile
              </Button>
              <Title level="2" className="title">Redeem AVAX</Title>
            </div>
            <RedeemAvax />
          </>
        ) : (
          <>
            <div className="header">
              {/* Placeholder for Logo */}
              {/* <svg width={50} height={50} viewBox="0 0 100 100" className="logo">
                <path d="M50 0L95.1141 25V75L50 100L4.88591 75V25L50 0Z" fill="#4A90E2"/>
                <path d="M50 15L82.4764 32.5V67.5L50 85L17.5236 67.5V32.5L50 15Z" fill="white"/>
                <path d="M50 28L72.3205 40V60L50 72L27.6795 60V40L50 28Z" fill="#4A90E2"/>
              </svg> */}
              <Title level="2" className="title">Profile</Title>
            </div>
            <Subheadline className="points">Total Points: {totalPoints}</Subheadline>

            <div className="button-group">
              <Button onClick={() => navigate('/redeem')} className="button primary">
                <FaGift style={{ marginRight: '8px' }} /> Redeem NFTs
              </Button>
              <Button onClick={() => navigate('/my-nfts')} className="button secondary">
                <FaWallet style={{ marginRight: '8px' }} /> My NFTs
              </Button>
              <Button onClick={() => navigate('/leaderboard')} className="button secondary">
                <FaWallet style={{ marginRight: '8px' }} /> Leaderboard
              </Button>
              <Button onClick={() => setShowRedeemAvax(true)} className="button tertiary">
                <FaCoins style={{ marginRight: '8px' }} /> Redeem AVAX
              </Button>
              {isWagmiConnected && (
                <Button
                  onClick={() => open({ view: 'Account' })}
                  className="button primary"
                >
                  <FaUserCircle style={{ marginRight: '8px' }} /> Open Web3 Profile
                </Button>
              )}
              <Button onClick={async () => { await supabase.auth.signOut(); onClose(); }} className="logout-button destructive">
                <FaSignOutAlt style={{ marginRight: '8px' }} /> Logout
              </Button>
            </div>

            {/* <div className="conversion-section">
              <Title level="3" className="title">Convert Points to AVAX</Title>
              <Subheadline className="subheadline">100 points = 0.001 AVAX</Subheadline>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter points to convert"n
                className="input"
              />
              <Button onClick={handleConvert} disabled={loading || !amount} className="convert-button primary">
                {loading ? 'Converting...' : '<FaExchangeAlt style={{ marginRight: '8px' }} /> Convert'}
              </Button>
              {message && <p style={{ color: '#28a745' }}>{message}</p>}
            </div> */}

            <Button onClick={onClose} className="close-button secondary">
              <FaTimes style={{ marginRight: '8px' }} /> Close
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;