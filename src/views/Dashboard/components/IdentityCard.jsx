import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlineOutlined';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { toast } from 'sonner';
import AddressDisplay from '../../../components/AddressDisplay';
import {
  IDENTITY_ABI,
  IDENTITY_ADDRESS,
  buildOpDigest,
  packCreateArgs,
  packLockArgs,
  useIdentityState,
} from '../../../hooks/contracts';
import { accountFromSeed } from '../../../hooks/useIdentities';
import { formatError, isUserRejection } from '../../../lib/errors';

function ConfirmDialog({ open, title, body, severity = 'warning', onClose, onConfirm, confirmText, confirmColor = 'warning' }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Alert severity={severity} sx={{ mb: 2 }}>
          {body}
        </Alert>
        <DialogContentText>This will require a wallet signature.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color={confirmColor} variant="contained">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function IdentityCard({ identity, digests, onRename, onDelete }) {
  const { address: walletAddress } = useAccount();
  const isDelegate = identity.delegateAddress?.toLowerCase() === walletAddress?.toLowerCase();
  const isWalletType = identity.type === 'wallet';
  const state = useIdentityState(identity.identityAddress);

  const { data: hash, isPending, writeContract, error, reset } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash });

  const [dialog, setDialog] = useState(null);
  const [renameOpen, setRenameOpen] = useState(false);
  const [newName, setNewName] = useState(identity.name);
  const [errorMsg, setErrorMsg] = useState('');

  const stateLoading = state.isLoading;
  const isWorking = isPending || receipt.isLoading;

  // Toast on tx state transitions
  React.useEffect(() => {
    if (receipt.isSuccess) toast.success('Transaction confirmed');
  }, [receipt.isSuccess]);

  React.useEffect(() => {
    if (error) {
      const msg = formatError(error);
      if (msg) toast.error(msg);
    }
  }, [error]);

  // ---- Signing helpers ------------------------------------------------------

  const signWithIdentity = async (hashToSign) => accountFromSeed(identity.identitySeed).sign({ hash: hashToSign });
  const signWithSecurity = async (hashToSign) => accountFromSeed(identity.securitySeed).sign({ hash: hashToSign });
  const signWithDelegate = async (hashToSign) => {
    // For wallet-type identities the delegate is the connected wallet. The
    // Signata registry verifies these with ecrecover against a raw hash, which
    // requires `eth_sign` â€” disabled by default in modern MetaMask. We don't
    // pretend it works; the caller surfaces a warning before reaching here.
    if (isWalletType) throw new Error('Wallet-type signing not supported');
    return accountFromSeed(identity.delegateSeed).sign({ hash: hashToSign });
  };

  // ---- Actions --------------------------------------------------------------

  const onRegister = async (e) => {
    e?.preventDefault();
    if (!digests) return;
    try {
      setErrorMsg('');
      reset();
      const hashToSign = buildOpDigest(
        digests.DOMAIN_SEPARATOR,
        digests.TXTYPE_CREATE_DIGEST,
        packCreateArgs(identity.delegateAddress, identity.securityAddress),
      );
      const { v, r, s } = await accountFromSeed(identity.identitySeed).sign({ hash: hashToSign });
      writeContract({
        chainId: mainnet.id,
        address: IDENTITY_ADDRESS,
        abi: IDENTITY_ABI,
        functionName: 'create',
        args: [Number(v), r, s, identity.identityAddress, identity.delegateAddress, identity.securityAddress],
      });
      toast.info('Submitting registrationâ€¦');
    } catch (err) {
      if (isUserRejection(err)) return;
      console.error(err);
      setErrorMsg(formatError(err));
    }
  };

  const onLock = async () => {
    if (!digests) return;
    try {
      setErrorMsg('');
      reset();
      setDialog(null);
      const hashToSign = buildOpDigest(
        digests.DOMAIN_SEPARATOR,
        digests.TXTYPE_LOCK_DIGEST,
        packLockArgs(state.lockCount),
      );
      const { v, r, s } = await signWithDelegate(hashToSign);
      writeContract({
        chainId: mainnet.id,
        address: IDENTITY_ADDRESS,
        abi: IDENTITY_ABI,
        functionName: 'lock',
        args: [identity.identityAddress, Number(v), r, s],
      });
      toast.info('Submitting lockâ€¦');
    } catch (err) {
      if (isUserRejection(err)) return;
      console.error(err);
      setErrorMsg(formatError(err));
    }
  };

  const onUnlock = async () => {
    if (!digests) return;
    try {
      setErrorMsg('');
      reset();
      setDialog(null);
      const hashToSign = buildOpDigest(
        digests.DOMAIN_SEPARATOR,
        digests.TXTYPE_UNLOCK_DIGEST,
        packLockArgs(state.lockCount),
      );
      const { v, r, s } = await signWithSecurity(hashToSign);
      writeContract({
        chainId: mainnet.id,
        address: IDENTITY_ADDRESS,
        abi: IDENTITY_ABI,
        functionName: 'unlock',
        args: [identity.identityAddress, Number(v), r, s],
      });
      toast.info('Submitting unlockâ€¦');
    } catch (err) {
      if (isUserRejection(err)) return;
      console.error(err);
      setErrorMsg(formatError(err));
    }
  };

  const onDestroy = async () => {
    if (!digests) return;
    try {
      setErrorMsg('');
      reset();
      setDialog(null);
      const hashToSign = buildOpDigest(digests.DOMAIN_SEPARATOR, digests.TXTYPE_DESTROY_DIGEST);
      const securitySig = await signWithSecurity(hashToSign);
      const delegateSig = await signWithDelegate(hashToSign);
      writeContract({
        chainId: mainnet.id,
        address: IDENTITY_ADDRESS,
        abi: IDENTITY_ABI,
        functionName: 'destroy',
        args: [
          identity.identityAddress,
          Number(delegateSig.v), delegateSig.r, delegateSig.s,
          Number(securitySig.v), securitySig.r, securitySig.s,
        ],
      });
      toast.info('Submitting destroyâ€¦');
    } catch (err) {
      if (isUserRejection(err)) return;
      console.error(err);
      setErrorMsg(formatError(err));
    }
  };

  // Wallet identities can't lock/destroy on modern wallets â€” the contract
  // verifies the delegate signature with ecrecover on a raw hash, which needs
  // `eth_sign`. Modern MetaMask disables that by default. We surface this
  // clearly rather than letting the user discover it via a cryptic error.
  const walletSigBlocked = isWalletType;

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h6">{identity.name || 'Unnamed Identity'}</Typography>

          <Stack spacing={0.5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" color="text.secondary" sx={{ width: 70 }}>
                Identity
              </Typography>
              <AddressDisplay address={identity.identityAddress} variant="caption" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" color="text.secondary" sx={{ width: 70 }}>
                Delegate
              </Typography>
              <AddressDisplay address={identity.delegateAddress} variant="caption" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" color="text.secondary" sx={{ width: 70 }}>
                Security
              </Typography>
              <AddressDisplay address={identity.securityAddress} variant="caption" />
            </Box>
          </Stack>

          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            <Chip
              label={isWalletType ? 'Wallet identity' : 'Independent'}
              size="small"
              variant="outlined"
              icon={<AccountBalanceWalletIcon />}
            />
            {stateLoading ? (
              <Skeleton variant="rounded" width={100} height={24} />
            ) : (
              <>
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
              </>
            )}
            {isWalletType && !isDelegate && (
              <Chip label="Connect delegate wallet" color="warning" size="small" />
            )}
          </Box>

          {walletSigBlocked && state.exists && !state.destroyed && (
            <Alert severity="warning" sx={{ mt: 1 }}>
              <AlertTitle>Lock / destroy unavailable for wallet identities</AlertTitle>
              The Signata registry verifies the delegate signature with{' '}
              <code>ecrecover</code> against a raw hash, which requires the legacy{' '}
              <code>eth_sign</code> RPC. Modern wallets (MetaMask 10+, Rabby, etc.) disable that by
              default. To lock or destroy this identity you would need to enable{' '}
              <em>â€œeth_sign requestsâ€</em> in your wallet&apos;s advanced settings, or recreate it as an
              Independent identity (separate delegate key).
            </Alert>
          )}

          {errorMsg && (
            <Alert severity="error" onClose={() => setErrorMsg('')}>
              {errorMsg}
            </Alert>
          )}
        </Stack>
      </CardContent>

      <CardActions sx={{ flexWrap: 'wrap', gap: 1 }}>
        <ButtonGroup variant="text" size="small">
          {!state.exists && !state.destroyed && (
            <Button
              onClick={onRegister}
              disabled={isWorking || !digests || (isWalletType && !isDelegate)}
            >
              Register
            </Button>
          )}
          {state.exists && !state.destroyed && !state.locked && !walletSigBlocked && (
            <Button onClick={() => setDialog('lock')} disabled={isWorking}>
              Lock
            </Button>
          )}
          {state.exists && !state.destroyed && state.locked && (
            <Button onClick={() => setDialog('unlock')} disabled={isWorking}>
              Unlock
            </Button>
          )}
          {state.exists && !state.destroyed && !walletSigBlocked && (
            <Button color="error" onClick={() => setDialog('destroy')} disabled={isWorking}>
              Destroy
            </Button>
          )}
          <Button onClick={() => setRenameOpen(true)}>Rename</Button>
          {!state.exists && (
            <Button
              color="error"
              onClick={() => {
                onDelete(identity.identitySeed);
                toast.success('Identity removed locally');
              }}
            >
              Remove
            </Button>
          )}
        </ButtonGroup>
        <Button
          size="small"
          endIcon={<ChevronRightIcon />}
          component={RouterLink}
          to={`/identity/${identity.identityAddress}`}
          sx={{ ml: 'auto' }}
        >
          Manage Rights
        </Button>
      </CardActions>

      <ConfirmDialog
        open={dialog === 'lock'}
        title="Lock this identity?"
        body="Locking prevents your identity from being used until you unlock it with the security key. Use this if you suspect the delegate key is compromised."
        onClose={() => setDialog(null)}
        onConfirm={onLock}
        confirmText="Lock"
        confirmColor="warning"
      />
      <ConfirmDialog
        open={dialog === 'unlock'}
        title="Unlock this identity?"
        body="Only unlock if you believe the threat is gone. If the delegate may still be compromised, do not unlock."
        onClose={() => setDialog(null)}
        onConfirm={onUnlock}
        confirmText="Unlock"
        confirmColor="warning"
      />
      <ConfirmDialog
        open={dialog === 'destroy'}
        title="Destroy this identity?"
        body="Destruction is permanent and on-chain. You will not be able to recover or re-register this identity address."
        severity="error"
        onClose={() => setDialog(null)}
        onConfirm={onDestroy}
        confirmText="Destroy"
        confirmColor="error"
      />

      <Dialog open={renameOpen} onClose={() => setRenameOpen(false)}>
        <DialogTitle>Rename identity</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            label="Name"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRenameOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              onRename(identity.identitySeed, newName);
              setRenameOpen(false);
              toast.success('Renamed');
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
