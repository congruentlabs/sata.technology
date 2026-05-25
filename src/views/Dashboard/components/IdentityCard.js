import React, { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Alert,
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
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { keccak256, concat, parseSignature } from 'viem';
import {
  IDENTITY_ABI,
  IDENTITY_ADDRESS,
  buildOpDigest,
  packCreateArgs,
  packLockArgs,
  useIdentityState,
} from '../../../hooks/contracts';
import { accountFromSeed } from '../../../hooks/useIdentities';

const shorten = (a) => (a ? `${a.slice(0, 6)}…${a.slice(-4)}` : '');

function ConfirmDialog({ open, title, body, severity = 'warning', onClose, onConfirm, confirmText, confirmColor = 'warning' }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Alert severity={severity} sx={{ mb: 2 }}>
          {body}
        </Alert>
        <DialogContentText>This action will require a wallet signature.</DialogContentText>
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
  const state = useIdentityState(identity.identityAddress);

  const { data: hash, isPending, writeContract, error, reset } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash });
  const { signMessageAsync } = useSignMessage();

  const [dialog, setDialog] = useState(null);
  const [renameOpen, setRenameOpen] = useState(false);
  const [newName, setNewName] = useState(identity.name);
  const [errorMsg, setErrorMsg] = useState('');

  const isWorking = isPending || receipt.isLoading;

  // ---- Signing helpers ------------------------------------------------------

  // Some operations need a signature from the delegate. If the identity is
  // wallet-type the delegate is the connected wallet (sign via wagmi);
  // otherwise the delegate seed is local and we sign in JS.
  const signWithDelegate = async (hashToSign) => {
    if (identity.type === 'wallet') {
      // personal_sign — prepends the EIP-191 prefix on the client side
      const sig = await signMessageAsync({ message: { raw: hashToSign } });
      return parseSignature(sig);
    }
    const delegateAccount = accountFromSeed(identity.delegateSeed);
    return delegateAccount.sign({ hash: hashToSign });
  };

  const signWithIdentity = async (hashToSign) => {
    const identityAccount = accountFromSeed(identity.identitySeed);
    return identityAccount.sign({ hash: hashToSign });
  };

  const signWithSecurity = async (hashToSign) => {
    const securityAccount = accountFromSeed(identity.securitySeed);
    return securityAccount.sign({ hash: hashToSign });
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
      const { v, r, s } = await signWithIdentity(hashToSign);
      writeContract({
        chainId: mainnet.id,
        address: IDENTITY_ADDRESS,
        abi: IDENTITY_ABI,
        functionName: 'create',
        args: [Number(v), r, s, identity.identityAddress, identity.delegateAddress, identity.securityAddress],
      });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.shortMessage || err.message);
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
    } catch (err) {
      console.error(err);
      setErrorMsg(err.shortMessage || err.message);
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
    } catch (err) {
      console.error(err);
      setErrorMsg(err.shortMessage || err.message);
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
    } catch (err) {
      console.error(err);
      setErrorMsg(err.shortMessage || err.message);
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h6">{identity.name || 'Unnamed Identity'}</Typography>
          <Box sx={{ fontFamily: 'monospace', fontSize: 12, color: 'text.secondary' }}>
            <div>Identity: {shorten(identity.identityAddress)}</div>
            <div>Delegate: {shorten(identity.delegateAddress)}</div>
            <div>Security: {shorten(identity.securityAddress)}</div>
          </Box>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            <Chip
              label={identity.type === 'wallet' ? 'Wallet identity' : 'Independent'}
              size="small"
              variant="outlined"
              icon={<AccountBalanceWalletIcon />}
            />
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
            {identity.type === 'wallet' && !isDelegate && (
              <Chip label="Connect delegate wallet" color="warning" size="small" />
            )}
          </Box>

          {receipt.isSuccess && (
            <Alert severity="success" onClose={() => reset()}>
              Transaction confirmed
            </Alert>
          )}
          {error && (
            <Alert severity="error" onClose={() => reset()}>
              {error.shortMessage || error.message}
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
            <Button onClick={onRegister} disabled={isWorking || !digests || (identity.type === 'wallet' && !isDelegate)}>
              Register
            </Button>
          )}
          {state.exists && !state.destroyed && !state.locked && (
            <Button
              onClick={() => setDialog('lock')}
              disabled={isWorking || (identity.type === 'wallet' && !isDelegate)}
            >
              Lock
            </Button>
          )}
          {state.exists && !state.destroyed && state.locked && (
            <Button onClick={() => setDialog('unlock')} disabled={isWorking}>
              Unlock
            </Button>
          )}
          {state.exists && !state.destroyed && (
            <Button
              color="error"
              onClick={() => setDialog('destroy')}
              disabled={isWorking || (identity.type === 'wallet' && !isDelegate)}
            >
              Destroy
            </Button>
          )}
          <Button onClick={() => setRenameOpen(true)}>Rename</Button>
          {!state.exists && (
            <Button color="error" onClick={() => onDelete(identity.identitySeed)}>
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
        body="Only unlock if you believe the threat is gone. If the delegate may still be compromised, rotate instead."
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
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
