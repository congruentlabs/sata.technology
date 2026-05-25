import React from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAccount, useChainId, useConnect, useSwitchChain } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { toast } from 'sonner';
import Main from 'layouts/Main';
import { useEncryptedIdentities, STATUS } from '../../hooks/useEncryptedIdentities';
import { useIdentityDigests } from '../../hooks/contracts';
import { formatError, isUserRejection } from '../../lib/errors';
import IdentityCard from './components/IdentityCard';
import CreateIdentityForm from './components/CreateIdentityForm';

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { connect, isPending: connecting } = useConnect();
  const { switchChain } = useSwitchChain();
  const digests = useIdentityDigests();

  const {
    identities,
    status,
    error: storeError,
    unlock,
    addIdentity,
    updateIdentity,
    removeIdentity,
  } = useEncryptedIdentities();

  const wrongChain = isConnected && chainId !== mainnet.id;
  const isUnlocked = status === STATUS.UNLOCKED;
  const isUnlocking = status === STATUS.UNLOCKING;

  const handleConnect = () => {
    connect(
      { connector: injected() },
      {
        onError: (err) => {
          const msg = formatError(err);
          if (msg) toast.error(msg);
        },
      },
    );
  };

  return (
    <Main>
      <Container maxWidth="md" sx={{ pt: 4, pb: 8 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Your Signata Identities
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Create blockchain-native identities you control. Register, lock, unlock, or destroy
              them on Ethereum mainnet, and attach rights like SATA-100 attestations.
            </Typography>
          </Box>

          {!isConnected && (
            <Alert
              severity="info"
              action={
                <Button variant="contained" onClick={handleConnect} disabled={connecting}>
                  {connecting ? 'Connecting…' : 'Connect Wallet'}
                </Button>
              }
            >
              <AlertTitle>Connect a wallet to get started</AlertTitle>
              Identities are scoped to the wallet that creates them. Any browser-extension wallet
              works (MetaMask, Rabby, Brave, Coinbase Wallet).
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

          {isConnected && !wrongChain && !isUnlocked && (
            <Alert
              severity="info"
              icon={<LockOpenIcon />}
              action={
                <Button
                  variant="contained"
                  onClick={async () => {
                    try {
                      await unlock();
                    } catch (err) {
                      if (!isUserRejection(err)) toast.error(formatError(err));
                    }
                  }}
                  disabled={isUnlocking}
                >
                  {isUnlocking ? 'Unlocking…' : 'Sign to unlock'}
                </Button>
              }
            >
              <AlertTitle>Identities are encrypted</AlertTitle>
              Sign a message with your wallet to decrypt your local identity seeds. The signature
              never leaves your browser and authorizes no transaction.
              {storeError && (
                <Box sx={{ mt: 1, color: 'error.main' }}>{storeError}</Box>
              )}
              {isUnlocking && <LinearProgress sx={{ mt: 1 }} />}
            </Alert>
          )}

          {isUnlocked && (
            <>
              {identities.length === 0 && (
                <Alert severity="info">
                  No identities yet on this wallet. Use the form below to create one.
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

              <CreateIdentityForm
                walletAddress={address}
                onCreate={async (id) => {
                  await addIdentity(id);
                  toast.success('Identity added locally — click Register to mint on-chain');
                }}
              />
            </>
          )}
        </Stack>
      </Container>
    </Main>
  );
}
