import React from 'react';
import { createRoot } from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react';
import { mainnet } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import App from './App';

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || '';
const networks = [mainnet];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'Signata',
    description: 'Decentralized Blockchain Identity Management',
    url: 'https://sata.technology',
    icons: ['https://sata.technology/logo.png'],
  },
  features: {
    analytics: false,
    email: false,
    socials: false,
  },
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
