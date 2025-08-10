import { Text } from '@telegram-apps/telegram-ui';

const Points = ({ score }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
      <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#FFD700" />
        <text x="50" y="60" textAnchor="middle" fontSize="40" fontWeight="bold" fill="#B8860B">P</text>
      </svg>
      <Text style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>{score}</Text>
    </div>
  );
};

export default Points;
