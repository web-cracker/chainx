import React, { useState, useEffect } from 'react';
import { createConfig, http, WagmiConfig } from 'wagmi';
import { avalancheFuji } from 'wagmi/chains';
import { walletConnect } from 'wagmi/connectors';
import { useAccount, useConnect, useDisconnect, useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { useNavigate } from 'react-router-dom';
import './p2p.css';

const projectId = '5a58c41246d3f7f22595ef132c4f40de';

const metadata = {
  name: 'AVAX Transfer App',
  description: 'A simple app to transfer AVAX',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const config = createConfig({
  chains: [avalancheFuji],
  transports: {
    [avalancheFuji.id]: http()
  },
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: true }),
  ],
});

function TransferApp() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error: connectError, isLoading: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: hash, error: txError, isLoading: isSending, sendTransaction } = useSendTransaction();
  const navigate = useNavigate();

  const [toAddress, setToAddress] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (txError) {
      setError(`Transaction failed: ${txError.message}`);
    }
  }, [txError]);

  const handleTransfer = () => {
    if (!toAddress) {
      setError('Please enter a valid recipient address.');
      return;
    }
    setError('');
    sendTransaction({
      to: toAddress,
      value: parseEther('0.01'),
    });
  };

  return (
    <div className="transfer-container">
      <button onClick={() => navigate('/')} className="back-button">← Back</button>

      <h1 className="title">AVAX Transfer</h1>
      <p className="subtitle">Send AVAX on Fuji Testnet instantly</p>

      {isConnected ? (
        <>
          <div className="wallet-info">
            <p className="wallet-label">Connected Wallet</p>
            <p className="wallet-address">{address}</p>
            <button onClick={() => disconnect()} className="disconnect-button">Disconnect</button>
          </div>

          <div className="input-group">
            <label htmlFor="toAddress" className="input-label">Recipient Address</label>
            <input
              type="text"
              id="toAddress"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              placeholder="0x..."
              className="input-field"
            />
          </div>

          <button
            onClick={handleTransfer}
            disabled={isSending}
            className="send-button"
          >
            {isSending ? 'Sending...' : 'Send 0.01 AVAX'}
          </button>
        </>
      ) : (
        <div className="connectors">
          {connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => connect({ connector })}
              disabled={isConnecting}
              className="connect-button"
            >
              {isConnecting ? 'Connecting...' : `Connect with ${connector.name}`}
            </button>
          ))}
        </div>
      )}

      {hash && (
        <div className="success-message">
          <p className="success-title">✅ Transaction Sent!</p>
          <p className="tx-link">
            <a
              href={`https://testnet.snowtrace.io/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Snowtrace
            </a>
          </p>
        </div>
      )}

      {(error || connectError) && (
        <div className="error-message">
          <p><strong>Error:</strong> {error || connectError?.message}</p>
        </div>
      )}
    </div>
  );
}

function P2P() {
  return (
    <WagmiConfig config={config}>
      <div className="p2p-wrapper">
        <TransferApp />
      </div>
    </WagmiConfig>
  );
}

export default P2P;
