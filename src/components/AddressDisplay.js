import React, { useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CheckIcon from '@mui/icons-material/Check';
import { useEnsName } from 'wagmi';
import { mainnet } from 'wagmi/chains';

const shorten = (a) => (a ? `${a.slice(0, 6)}…${a.slice(-4)}` : '');

export default function AddressDisplay({
  address,
  variant = 'body2',
  showCopy = true,
  showExplorer = true,
  ens = true,
  monospace = true,
}) {
  const { data: ensName } = useEnsName({ address, chainId: mainnet.id, query: { enabled: ens && Boolean(address) } });
  const [copied, setCopied] = useState(false);

  if (!address) return null;

  const display = ensName || shorten(address);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* ignore */
    }
  };

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
      <Typography
        variant={variant}
        component="span"
        sx={{ fontFamily: monospace && !ensName ? 'monospace' : undefined }}
      >
        {display}
      </Typography>
      {showCopy && (
        <Tooltip title={copied ? 'Copied' : 'Copy address'}>
          <IconButton size="small" onClick={onCopy}>
            {copied ? <CheckIcon fontSize="inherit" /> : <ContentCopyIcon fontSize="inherit" />}
          </IconButton>
        </Tooltip>
      )}
      {showExplorer && (
        <Tooltip title="View on Etherscan">
          <IconButton
            size="small"
            component="a"
            href={`https://etherscan.io/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <OpenInNewIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}
