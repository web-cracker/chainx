import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Title, Subheadline } from '@telegram-apps/telegram-ui';
import Points from '../components/Points';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://okmdjcuvqebjxcumpbih.supabase.co'; // replace with your Supabase project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rbWRqY3V2cWVianhjdW1wYmloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MjU0MTQsImV4cCI6MjA3MDMwMTQxNH0.4Qr019gQrhteIV09ma3niS38NZstI63jyzIqI97WNeM'; // replace with your anon/public API key
const supabase = createClient(supabaseUrl, supabaseKey);

const Dashboard = ({ session }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const userEmail = session?.user?.email;

  // Try to get wallet_address from location.state or fallback to localStorage
  const storedWallet = localStorage.getItem('wallet_address');

  const { score = 0, wallet_address: stateWallet } = location.state || {};
  const wallet_address = stateWallet || storedWallet || '';

  const [totalPoints, setTotalPoints] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

  useEffect(() => {
    console.log("Dashboard mounted.");
    console.log("Location state:", location.state);
    console.log("Wallet address:", wallet_address);
    console.log("User Email:", userEmail);

    const updateAndFetchPoints = async () => {
      if (!userEmail) {
        console.warn("No user email found, skipping DB update.");
        return;
      }

      console.log("Fetching coins for email:", userEmail);

      // Step 1: Fetch existing coins
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('coins')
        .eq('email', userEmail)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error fetching user:', fetchError);
        return;
      }

      const currentCoins = existingUser?.coins || 0;
      console.log('Coins before update:', currentCoins);

      // Step 2: Calculate new total only if quiz completed
      if (location.state?.quizCompleted) {
        const quizCoins = score * 10;
        const newTotalPoints = currentCoins + quizCoins;
        console.log(`Quiz completed. Adding ${quizCoins} coins.`);

        const { error: updateError } = await supabase
          .from('users')
          .upsert([{ email: userEmail, coins: newTotalPoints }], { onConflict: 'email' });

        if (updateError) {
          console.error('Error updating coins:', updateError);
          return;
        }
      } else {
        console.log("Quiz not marked as completed, skipping update.");
      }

      // Step 3: Fetch updated coins after update
      const { data: updatedUser, error: refetchError } = await supabase
        .from('users')
        .select('coins')
        .eq('email', userEmail)
        .single();

      if (refetchError) {
        console.error('Error fetching updated coins:', refetchError);
        return;
      }

      console.log('Coins after update:', updatedUser.coins);

      // Step 4: Update local state to show updated coins
      setTotalPoints(updatedUser.coins || 0);
    };

    updateAndFetchPoints();
  }, [userEmail, location.state, score]);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const percentage = (score / 5) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{
      background: 'black',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: isSmallScreen ? '20px' : '40px',
      minHeight: '100vh',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <Title
        level="1"
        style={{
          color: 'white',
          marginBottom: isSmallScreen ? '20px' : '40px',
          fontSize: isSmallScreen ? '28px' : '36px'
        }}
      >
        Quiz Results
      </Title>

      <div style={{ position: 'relative', marginBottom: '40px' }}>
        <svg width="200" height="200" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#333" strokeWidth="10" />
          <circle
            cx="50" cy="50" r="45" fill="none"
            stroke="#007AFF" strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          {score} / 5
        </div>
      </div>

      <h1 style={{ color: '#FF9500', fontSize: isSmallScreen ? '18px' : '20px', fontWeight: 'bold' }}>
        Total Coins:
      </h1>
      <Points score={totalPoints} />

      {location.state?.quizCompleted && (
        <p style={{ color: 'white', fontSize: isSmallScreen ? '16px' : '18px', marginTop: '5px' }}>
          Current Quiz Score: {score * 10} coins
        </p>
      )}

      <Subheadline
        level="1"
        style={{
          color: 'white',
          marginBottom: isSmallScreen ? '20px' : '40px',
          fontSize: isSmallScreen ? '18px' : '24px'
        }}
      >
        You earned {score * 10} coins!
      </Subheadline>

      <div style={{
        display: 'flex',
        flexDirection: isSmallScreen ? 'column' : 'row',
        gap: '20px'
      }}>
        <Button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: '#007AFF',
            color: 'white',
            borderRadius: '15px',
            padding: isSmallScreen ? '15px 30px' : '20px 40px',
            fontSize: isSmallScreen ? '18px' : '20px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 5px 20px rgba(0, 122, 255, 0.5)',
            transition: 'all 0.3s ease'
          }}
        >
          Play Again
        </Button>
        <Button
          onClick={() => navigate('/redeem')}
          style={{
            backgroundColor: '#FF9500',
            color: 'white',
            borderRadius: '15px',
            padding: isSmallScreen ? '15px 30px' : '20px 40px',
            fontSize: isSmallScreen ? '18px' : '20px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 5px 20px rgba(255, 149, 0, 0.5)',
            transition: 'all 0.3s ease'
          }}
        >
          Redeem NFTs
        </Button>
        <Button
          onClick={() => navigate('/my-nfts')}
          style={{
            backgroundColor: '#00C853',
            color: 'white',
            borderRadius: '15px',
            padding: isSmallScreen ? '15px 30px' : '20px 40px',
            fontSize: isSmallScreen ? '18px' : '20px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 5px 20px rgba(0, 200, 83, 0.5)',
            transition: 'all 0.3s ease'
          }}
        >
          My NFTs
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
