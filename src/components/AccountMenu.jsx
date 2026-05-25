import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LockIcon from '@mui/icons-material/Lock';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { toast } from 'sonner';

const shorten = (a) => (a ? `${a.slice(0, 6)}…${a.slice(-4)}` : '');

export default function AccountMenu({ onLockIdentities }) {
  const { address, isConnected } = useAccount();
  const { connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address, chainId: mainnet.id, query: { enabled: Boolean(address) } });
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName,
    chainId: mainnet.id,
    query: { enabled: Boolean(ensName) },
  });

  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);

  if (!isConnected) {
    return (
      <Button
        variant="outlined"
        size="small"
        onClick={() =>
          connect(
            { connector: injected() },
            {
              onError: (err) => toast.error(err.shortMessage || err.message),
            },
          )
        }
        disabled={isPending}
      >
        {isPending ? 'Connecting…' : 'Connect'}
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        onClick={(e) => setAnchor(e.currentTarget)}
        startIcon={
          <Avatar
            src={ensAvatar || undefined}
            sx={{ width: 20, height: 20, fontSize: 10, bgcolor: 'primary.main' }}
          >
            {(ensName || address).slice(2, 4).toUpperCase()}
          </Avatar>
        }
      >
        {ensName || shorten(address)}
      </Button>
      <Menu
        anchorEl={anchor}
        open={open}
        onClose={() => setAnchor(null)}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem disabled>
          <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
            {address}
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={async () => {
            await navigator.clipboard.writeText(address);
            toast.success('Address copied');
            setAnchor(null);
          }}
        >
          <ListItemIcon>
            <ContentCopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy address</ListItemText>
        </MenuItem>
        <MenuItem
          component="a"
          href={`https://etherscan.io/address/${address}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setAnchor(null)}
        >
          <ListItemIcon>
            <OpenInNewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View on Etherscan</ListItemText>
        </MenuItem>
        {onLockIdentities && (
          <MenuItem
            onClick={() => {
              onLockIdentities();
              setAnchor(null);
              toast.info('Identities locked');
            }}
          >
            <ListItemIcon>
              <LockIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Lock identities</ListItemText>
          </MenuItem>
        )}
        <Divider />
        <MenuItem
          onClick={() => {
            disconnect();
            setAnchor(null);
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Disconnect</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
