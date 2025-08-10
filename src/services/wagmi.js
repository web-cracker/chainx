import { createConfig, fallback, http, unstable_connector } from 'wagmi';
import { injected, walletConnect } from 'wagmi/connectors';
import { avalancheFuji } from 'viem/chains';
import { WC_WEB3_PROJECT_ID } from '../constants';

const metadata = {
  name: 'Web3 Game',
  description: 'Connect wallet to play Web3 quiz game',
  url: 'https://c4188b888829.ngrok-free.app',
  icons: ['https://c4188b888829.ngrok-free.app/logo.png'], // optional, improves UX
};

const chains = [avalancheFuji];

export const config = createConfig({
  chains,
  transports: {
    [avalancheFuji.id]: fallback([
      unstable_connector(injected),
      http('https://api.avax-test.network/ext/bc/C/rpc'),
    ]),
  },
  connectors: [
    injected(),
    walletConnect({
      projectId: WC_WEB3_PROJECT_ID || '5a58c41246d3f7f22595ef132c4f40',
      walletFeatures: false,
      showQrModal: false, // Reverted to false for deep linking
      metadata, // required for WC v2
    }),
  ],
  metadata,
});

console.log('Wagmi config created:', config);
