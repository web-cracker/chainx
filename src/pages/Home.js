import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useNavigate } from 'react-router-dom';
import { Button, Title } from '@telegram-apps/telegram-ui';
import { useEffect, useState } from 'react';
import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react';
import { initData } from '@telegram-apps/sdk-react';
import { supabase } from '../services/supabase';
import ProfileModal from '../components/ProfileModal';

const Home = ({ session }) => {
  const { isConnected: isWagmiConnected, address: wagmiAddress } = useAccount();
  const { open } = useWeb3Modal();
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const userFriendlyAddress = useTonAddress();
  const isTonConnected = !!userFriendlyAddress;

  const [dbUser, setDbUser] = useState(null);

  const telegramUser = initData?.user || {};

  useEffect(() => {
    const syncUserWithDB = async () => {
      let walletAddress = isWagmiConnected ? wagmiAddress : isTonConnected ? userFriendlyAddress : null;

      if (!walletAddress) return;

      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error fetching user:', fetchError.message);
        return;
      }

      if (existingUser) {
        setDbUser(existingUser);
      } else {
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert([{
            wallet_address: walletAddress,
            coins: 0
          }])
          .select()
          .single();

        if (insertError) {
          console.error('Error inserting user:', insertError.message);
          return;
        }
        setDbUser(newUser);
      }
    };

    syncUserWithDB();
  }, [isWagmiConnected, wagmiAddress, isTonConnected, userFriendlyAddress,]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleConnectWeb3Wallet = () => {
    open();
  };

  const handleLaunchGame = () => {
    navigate('/game-options');
  };

  // Add this effect anywhere inside Home component (preferably near your other useEffects)
useEffect(() => {
  const walletAddress = isWagmiConnected ? wagmiAddress : isTonConnected ? userFriendlyAddress : null;
  if (walletAddress) {
    localStorage.setItem('wallet_address', walletAddress);
    console.log('Saved wallet address to localStorage:', walletAddress);
  } else {
    localStorage.removeItem('wallet_address');
  }
}, [isWagmiConnected, wagmiAddress, isTonConnected, userFriendlyAddress]);


  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'black', display: 'flex',
      flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', textAlign: 'center',
      padding: '20px',
    }}>
      {/* New Logo for Profile Modal */}
      <div
        onClick={() => setIsProfileOpen(true)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          cursor: 'pointer',
          zIndex: 10, // Ensure it's above other content
        }}
      >
        <svg width={50} height={50} viewBox="0 0 100 100">
          <path d="M50 0L95.1141 25V75L50 100L4.88591 75V25L50 0Z" fill="#4A90E2"/>
          <path d="M50 15L82.4764 32.5V67.5L50 85L17.5236 67.5V32.5L50 15Z" fill="white"/>
          <path d="M50 28L72.3205 40V60L50 72L27.6795 60V40L50 28Z" fill="#4A90E2"/>
        </svg>
      </div>
      
      <div style={{ marginBottom: '40px' }}>
        {/* SVG Logo */}
        <svg width={150} height={150} viewBox="0 0 100 100">
          <path d="M50 0L95.1141 25V75L50 100L4.88591 75V25L50 0Z" fill="#4A90E2"/>
          <path d="M50 15L82.4764 32.5V67.5L50 85L17.5236 67.5V32.5L50 15Z" fill="white"/>
          <path d="M50 28L72.3205 40V60L50 72L27.6795 60V40L50 28Z" fill="#4A90E2"/>
        </svg>
      </div>
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
  Welcome to, <b style={{ color: 'red' }}>AVA</b> Quiz!
</Title>
{session && session.user && session.user.email && (
  <p
    style={{
      color: 'white',
      fontFamily: "'Poppins', sans-serif",
      fontSize: window.innerWidth < 600 ? '12px' : '16px',
      textAlign: 'center',
      lineHeight: '1.5',
      margin: '0 10px 10px 10px' // Added bottom margin
    }}
  >
    Logged in as: {session.user.email}
  </p>
)}
<p
  style={{
    color: 'white',
    fontFamily: "'Poppins', sans-serif",
    fontSize: window.innerWidth < 600 ? '14px' : '18px',
    textAlign: 'center',
    lineHeight: '1.5',
    margin: '0 10px'
  }}
>
  Solve blockchain quizzes, test your skills, and win <b style={{ color: 'white' }}>AVAX</b> rewards!  
</p>
        {/* <Subheadline level="2" style={{ color: '#a0a0a0' }}>
          {dbUser ? `Hello, ${dbUser.first_name || 'User'}!` : 'Connect your wallet to get started'}
        </Subheadline> */}
      </div>

      <div style={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', gap: '20px' }}>
        {(isWagmiConnected || isTonConnected) ? (
          <>
            {/* <Button onClick={() => navigate('/quiz/L1')} style={btnPrimary}>Launch L1 Quiz</Button>
            <Button onClick={() => navigate('/quiz/L2')} style={btnPrimary}>Launch L2 Quiz</Button>
            <Button onClick={() => navigate('/quiz/L3')} style={btnPrimary}>Launch L3 Quiz</Button> */}
            <Button
              onClick={handleLaunchGame}
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
              Launch Game
            </Button>
            {isWagmiConnected && (
              <Button
              onClick={() => {
                console.log('Opening Web3 Profile...');
                open({ view: 'Account' });
              }}
              style={{
                backgroundColor: 'black',
                color: 'white',
                borderRadius: '12px',
                padding: '15px 30px',
                fontSize: '18px',
                fontWeight: 'bold',
                border: '2px solid #007AFF',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0, 122, 255, 0.4)',
                transition: 'all 0.3s ease',
              }}
              >
                Open Web3 Profile
              </Button>
            )}
            {/* <Button onClick={() => setIsProfileOpen(true)} style={btnSecondary1}>Swap</Button> */}
            {isTonConnected && <TonConnectButton />}
          </>
        ) : (
          <>
            <Button onClick={handleConnectWeb3Wallet} style={btnPrimary}>Connect Web3 Wallet</Button>
            {/* <TonConnectButton /> */}
          </>
        )}
        {/* <Button onClick={handleMultiplayerClick} style={{backgroundColor:'#FF9500',color:'white'}}>Multiplayer</Button> */}
        <Button onClick={() => navigate('/p2p')} style={{backgroundColor:'#00C853',color:'white'}}>Send AVAX</Button>
      </div>

      {isProfileOpen && dbUser && (
        <ProfileModal user={dbUser} onClose={() => setIsProfileOpen(false)} />
      )}
    </div>
  );
};

const btnPrimary = {
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
};

export default Home;