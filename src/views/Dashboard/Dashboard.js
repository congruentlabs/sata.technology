import React from 'react';
import { Alert, AlertTitle, Box, Button, Container, Stack, Typography } from '@mui/material';
import { useAccount, useChainId, useConnect, useSwitchChain } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import Main from 'layouts/Main';
import { useIdentities } from '../../hooks/useIdentities';
import { useIdentityDigests } from '../../hooks/contracts';
import IdentityCard from './components/IdentityCard';
import CreateIdentityForm from './components/CreateIdentityForm';

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { connect, isPending: connecting, error: connectError } = useConnect();
  const { switchChain } = useSwitchChain();
  const digests = useIdentityDigests();
  const { identities, addIdentity, updateIdentity, removeIdentity } = useIdentities(address);

  const wrongChain = isConnected && chainId !== mainnet.id;

  return (
    <Main>
      <Container maxWidth="md" sx={{ pt: 4, pb: 8 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Your Signata Identities
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Signata lets you create blockchain-native identities you control. Lock, unlock,
              destroy, and attach rights (like KYC attestations) to identities you create here.
            </Typography>
          </Box>

          {!isConnected && (
            <Alert
              severity="info"
              action={
                <Button
                  variant="contained"
                  onClick={() => connect({ connector: injected() })}
                  disabled={connecting}
                >
                  {connecting ? 'Connecting…' : 'Connect Wallet'}
                </Button>
              }
            >
              <AlertTitle>Connect a wallet to get started</AlertTitle>
              Identities are scoped to the wallet that creates them. Use any browser extension
              wallet (MetaMask, Rabby, Brave, Coinbase Wallet).
              {connectError && (
                <Box sx={{ mt: 1, color: 'error.main' }}>
                  {connectError.shortMessage || connectError.message}
                </Box>
              )}
            </Alert>
          )}

          {wrongChain && (
            <Alert
              severity="error"
              action={
                <Button onClick={() => switchChain?.({ chainId: mainnet.id })}>Switch</Button>
              }
            >
              <AlertTitle>Wrong network</AlertTitle>
              Identity contracts live on Ethereum mainnet — please switch.
            </Alert>
          )}

          {isConnected && !wrongChain && (
            <>
              <Alert severity="success" variant="outlined">
                <AlertTitle>Connected</AlertTitle>
                {address}
              </Alert>

              {identities.length === 0 && (
                <Alert severity="info">
                  You have no identities yet on this wallet. Use the form below to create one.
                </Alert>
              )}

              {identities.map((id) => (
                <IdentityCard
                  key={id.identitySeed}
                  identity={id}
                  digests={digests}
                  onRename={(seed, newName) => updateIdentity(seed, { name: newName })}
                  onDelete={removeIdentity}
                />
              ))}

              <CreateIdentityForm walletAddress={address} onCreate={addIdentity} />
            </>
          )}
        </Stack>
      </Container>
    </Main>
  );
}
