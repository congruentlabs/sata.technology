import React, { useMemo } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
  erc20Abi,
  formatUnits,
} from 'viem';
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { mainnet } from 'wagmi/chains';
import Main from 'layouts/Main';
import { useIdentities } from '../../hooks/useIdentities';
import {
  IDENTITY_ABI,
  IDENTITY_ADDRESS,
  KYC_CLAIM_ABI,
  KYC_CLAIM_ADDRESS,
  SATA_100_ABI,
  SATA_100_ADDRESS,
  SATA_ADDRESS,
  useIdentityState,
} from '../../hooks/contracts';

const shorten = (a) => (a ? `${a.slice(0, 6)}…${a.slice(-4)}` : '');

export default function IdentityDetail() {
  const { id: routeAddress } = useParams();
  const { address: walletAddress, isConnected } = useAccount();
  const { identities } = useIdentities(walletAddress);

  const identity = useMemo(
    () =>
      identities.find(
        (x) =>
          x.identityAddress?.toLowerCase() === routeAddress?.toLowerCase() ||
          x.delegateAddress?.toLowerCase() === routeAddress?.toLowerCase(),
      ),
    [identities, routeAddress],
  );

  const targetIdentityAddress = identity?.identityAddress;
  const state = useIdentityState(targetIdentityAddress);

  // Identity-level chain reads for delegate / security pointers
  const { data: registryData } = useReadContracts({
    contracts: targetIdentityAddress
      ? [
          {
            address: IDENTITY_ADDRESS,
            abi: IDENTITY_ABI,
            functionName: '_delegateKeyToIdentity',
            args: [identity?.delegateAddress],
            chainId: mainnet.id,
          },
        ]
      : [],
    query: { enabled: Boolean(targetIdentityAddress && identity?.delegateAddress) },
  });

  // ---- SATA-100 claim flow --------------------------------------------------
  const delegate = identity?.delegateAddress;
  const { data: sata100Data } = useReadContracts({
    contracts: delegate
      ? [
          { address: SATA_100_ADDRESS, abi: SATA_100_ABI, functionName: 'feeAmount', chainId: mainnet.id },
          { address: SATA_100_ADDRESS, abi: SATA_100_ABI, functionName: 'purchasesEnabled', chainId: mainnet.id },
          {
            address: SATA_ADDRESS,
            abi: erc20Abi,
            functionName: 'balanceOf',
            args: [walletAddress],
            chainId: mainnet.id,
          },
          {
            address: SATA_ADDRESS,
            abi: erc20Abi,
            functionName: 'allowance',
            args: [walletAddress, SATA_100_ADDRESS],
            chainId: mainnet.id,
          },
        ]
      : [],
    query: { enabled: Boolean(delegate && walletAddress) },
  });

  const sata100Fee = sata100Data?.[0]?.result ?? 0n;
  const sata100Enabled = Boolean(sata100Data?.[1]?.result);
  const sataBalance = sata100Data?.[2]?.result ?? 0n;
  const sataAllowance = sata100Data?.[3]?.result ?? 0n;

  const needsApproval = sataAllowance < sata100Fee;

  const { data: kycClaimedRaw } = useReadContract({
    address: KYC_CLAIM_ADDRESS,
    abi: KYC_CLAIM_ABI,
    functionName: 'claimedRight',
    args: delegate ? [delegate] : undefined,
    chainId: mainnet.id,
    query: { enabled: Boolean(delegate) },
  });

  const kycClaimed = useMemo(() => {
    if (kycClaimedRaw == null) return null;
    if (typeof kycClaimedRaw === 'boolean') return kycClaimedRaw;
    try {
      return BigInt(kycClaimedRaw) !== 0n;
    } catch {
      return false;
    }
  }, [kycClaimedRaw]);

  const approve = useWriteContract();
  const approveReceipt = useWaitForTransactionReceipt({ hash: approve.data });
  const purchase = useWriteContract();
  const purchaseReceipt = useWaitForTransactionReceipt({ hash: purchase.data });

  const onApprove = () => {
    approve.reset();
    approve.writeContract({
      chainId: mainnet.id,
      address: SATA_ADDRESS,
      abi: erc20Abi,
      functionName: 'approve',
      args: [SATA_100_ADDRESS, sata100Fee],
    });
  };

  const onPurchase = () => {
    purchase.reset();
    purchase.writeContract({
      chainId: mainnet.id,
      address: SATA_100_ADDRESS,
      abi: SATA_100_ABI,
      functionName: 'purchaseRight',
      args: [delegate],
    });
  };

  const isPurchasing = approve.isPending || approveReceipt.isLoading || purchase.isPending || purchaseReceipt.isLoading;

  if (!isConnected) {
    return (
      <Main>
        <Container maxWidth="md" sx={{ pt: 4, pb: 8 }}>
          <Alert severity="warning">Connect your wallet to view identity details.</Alert>
        </Container>
      </Main>
    );
  }

  if (!identity) {
    return (
      <Main>
        <Container maxWidth="md" sx={{ pt: 4, pb: 8 }}>
          <Stack spacing={2}>
            <Button startIcon={<ArrowBackIcon />} component={RouterLink} to="/">
              Back to identities
            </Button>
            <Alert severity="error">
              No local identity matches <code>{routeAddress}</code>. Identities are stored per-wallet;
              switch to the wallet that created it.
            </Alert>
          </Stack>
        </Container>
      </Main>
    );
  }

  return (
    <Main>
      <Container maxWidth="md" sx={{ pt: 4, pb: 8 }}>
        <Stack spacing={3}>
          <Button startIcon={<ArrowBackIcon />} component={RouterLink} to="/" sx={{ alignSelf: 'flex-start' }}>
            Back to identities
          </Button>

          <Box>
            <Typography variant="h4">{identity.name}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
              {identity.identityAddress}
            </Typography>
          </Box>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                On-chain status
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1 }}>
                {!state.destroyed && (
                  <Chip
                    label={state.exists ? 'Registered' : 'Unregistered'}
                    color={state.exists ? 'success' : 'warning'}
                    variant={state.exists ? 'outlined' : 'filled'}
                    size="small"
                    icon={state.exists ? <FingerprintIcon /> : <ErrorOutlineIcon />}
                  />
                )}
                {state.exists && !state.destroyed && (
                  <Chip
                    label={state.locked ? 'Locked' : 'Unlocked'}
                    color={state.locked ? 'error' : 'success'}
                    variant={state.locked ? 'filled' : 'outlined'}
                    size="small"
                    icon={state.locked ? <LockIcon /> : <LockOpenIcon />}
                  />
                )}
                {state.destroyed && (
                  <Chip label="Destroyed" color="error" size="small" icon={<ErrorOutlineIcon />} />
                )}
              </Box>
              <Box sx={{ mt: 2, fontFamily: 'monospace', fontSize: 13 }}>
                <div>Delegate: {identity.delegateAddress}</div>
                <div>Security: {identity.securityAddress}</div>
                <div>Lock count: {String(state.lockCount)}</div>
                <div>Rollover count: {String(state.rolloverCount)}</div>
              </Box>
            </CardContent>
          </Card>

          {!state.exists && (
            <Alert severity="info">
              This identity hasn’t been registered on-chain yet. Go back to the dashboard and click
              <strong> Register</strong> on its card to mint it.
            </Alert>
          )}

          {state.exists && (
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">SATA-100 Right</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Holding a SATA-100 right is a paid attestation that boosts your standing within
                  the Signata ecosystem. The cost is paid in SATA tokens to the SATA-100 contract.
                </Typography>
                <Stack spacing={1} sx={{ mt: 2 }}>
                  <div>
                    Price: <strong>{formatUnits(sata100Fee, 18)} SATA</strong>
                  </div>
                  <div>
                    Your SATA balance: <strong>{formatUnits(sataBalance, 18)}</strong>
                  </div>
                  <div>
                    Purchases enabled:{' '}
                    <strong>{sata100Enabled ? 'yes' : 'no'}</strong>
                  </div>
                  {(approve.error || purchase.error) && (
                    <Alert severity="error">
                      {(approve.error || purchase.error).shortMessage ||
                        (approve.error || purchase.error).message}
                    </Alert>
                  )}
                  {purchaseReceipt.isSuccess && (
                    <Alert severity="success">SATA-100 right purchased!</Alert>
                  )}
                  {isPurchasing && <LinearProgress />}
                </Stack>
              </CardContent>
              <CardActions>
                {needsApproval ? (
                  <Button
                    variant="contained"
                    onClick={onApprove}
                    disabled={!sata100Enabled || isPurchasing || sataBalance < sata100Fee}
                  >
                    Approve SATA
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={onPurchase}
                    disabled={!sata100Enabled || isPurchasing || sataBalance < sata100Fee}
                  >
                    Purchase SATA-100
                  </Button>
                )}
              </CardActions>
            </Card>
          )}

          {state.exists && (
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">KYC Right</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  KYC attestations are minted by Signata after off-chain identity verification. The
                  claim signature must be issued by the KYC provider — start the process at the link
                  below and the claim button will appear here once a salt is available for your
                  delegate address.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip
                    label={kycClaimed ? 'KYC claimed' : 'Not claimed'}
                    color={kycClaimed ? 'success' : 'default'}
                    size="small"
                  />
                </Box>
                {!kycClaimed && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <AlertTitle>How to claim</AlertTitle>
                    The KYC claim requires an off-chain attestation signature from the Signata KYC
                    provider. Visit{' '}
                    <a href="https://id.signata.net" target="_blank" rel="noopener noreferrer">
                      id.signata.net
                    </a>{' '}
                    to start verification — once approved you’ll be issued the credentials needed to
                    call <code>claimRight</code> here.
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}
        </Stack>
      </Container>
    </Main>
  );
}
