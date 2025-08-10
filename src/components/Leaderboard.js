import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase'; // Assuming supabase client is exported from here
import { Title, Cell, List } from '@telegram-apps/telegram-ui'; // Using Telegram UI components for consistency

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('email, wallet_address, coins')
          .order('coins', { ascending: false });

        if (error) {
          throw error;
        }

        setLeaderboardData(data);
      } catch (err) {
        console.error('Error fetching leaderboard:', err.message);
        setError('Failed to load leaderboard. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>Loading Leaderboard...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>{error}</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <Title level="1" style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>
        Leaderboard
      </Title>
      {leaderboardData.length === 0 ? (
        <div style={{ color: 'white', textAlign: 'center' }}>No users on the leaderboard yet.</div>
      ) : (
        <List>
          {leaderboardData.map((user, index) => (
            <Cell
              key={user.email || user.wallet_address || index} // Use a unique key
              before={<span style={{ color: 'white', fontWeight: 'bold', minWidth: '30px' }}>#{index + 1}</span>}
              subtitle={
  <div style={{ color: '#a0a0a0', fontSize: '12px' }}>
    {user.email && <div>Email: {user.email}</div>}
    {user.wallet_address && <div>Wallet: {user.wallet_address.substring(0, 6)}...{user.wallet_address.substring(user.wallet_address.length - 4)}</div>}
  </div>
}
              after={<span style={{ color: '#FFD700', fontWeight: 'bold' }}>{user.coins} Coins</span>}
              style={{ backgroundColor: '#333', marginBottom: '10px', borderRadius: '8px' }} 
            >
              <span style={{ color: 'white', fontWeight: 'bold' }}>
                {user.email || (user.wallet_address ? `User ${user.wallet_address.substring(0, 6)}` : `User ${index + 1}`)}
              </span>
            </Cell>
          ))}
        </List>
      )}
    </div>
  );
};

export default Leaderboard;
