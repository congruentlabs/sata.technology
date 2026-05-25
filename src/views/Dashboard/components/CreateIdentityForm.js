import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  buildIndependentIdentity,
  buildWalletIdentity,
  generateSeed,
} from '../../../hooks/useIdentities';

export default function CreateIdentityForm({ walletAddress, onCreate }) {
  const [tab, setTab] = useState(0);
  const [identitySeed, setIdentitySeed] = useState('');
  const [delegateSeed, setDelegateSeed] = useState('');
  const [securitySeed, setSecuritySeed] = useState('');
  const [importData, setImportData] = useState('');
  const [importError, setImportError] = useState('');

  const generateWalletSeeds = () => {
    setIdentitySeed(generateSeed());
    setSecuritySeed(generateSeed());
  };

  const generateIndependentSeeds = () => {
    setIdentitySeed(generateSeed());
    setDelegateSeed(generateSeed());
    setSecuritySeed(generateSeed());
  };

  const onCreateWallet = (e) => {
    e.preventDefault();
    try {
      const id = buildWalletIdentity({ identitySeed, securitySeed, walletAddress });
      onCreate(id);
      setIdentitySeed('');
      setSecuritySeed('');
    } catch (err) {
      console.error(err);
    }
  };

  const onCreateIndependent = (e) => {
    e.preventDefault();
    try {
      const id = buildIndependentIdentity({
        identitySeed,
        delegateSeed,
        securitySeed,
        walletAddress,
      });
      onCreate(id);
      setIdentitySeed('');
      setDelegateSeed('');
      setSecuritySeed('');
    } catch (err) {
      console.error(err);
    }
  };

  const onImport = (e) => {
    e.preventDefault();
    try {
      setImportError('');
      const parsed = JSON.parse(importData);
      if (!parsed.identitySeed || !parsed.identityAddress) {
        throw new Error('Identity JSON missing required fields');
      }
      onCreate(parsed);
      setImportData('');
    } catch (err) {
      setImportError(err.message);
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Create a new identity
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth">
            <Tab label="Wallet" />
            <Tab label="Independent" />
            <Tab label="Import" />
          </Tabs>
        </Box>

        {tab === 0 && (
          <form onSubmit={onCreateWallet}>
            <Stack spacing={2}>
              <Alert severity="info">
                Wallet identities use your connected wallet as the delegate key. Easy to use, but
                links the on-chain identity activity to this wallet address.
              </Alert>
              <TextField
                label="Identity Seed"
                value={identitySeed}
                onChange={(e) => setIdentitySeed(e.target.value)}
                size="small"
                fullWidth
              />
              <TextField label="Delegate" value={walletAddress || '(not connected)'} disabled size="small" />
              <TextField
                label="Security Seed"
                value={securitySeed}
                onChange={(e) => setSecuritySeed(e.target.value)}
                size="small"
                fullWidth
              />
              <Stack direction="row" spacing={1}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<AddIcon />}
                  disabled={!identitySeed || !securitySeed || !walletAddress}
                >
                  Add identity
                </Button>
                <Button variant="outlined" startIcon={<RefreshIcon />} onClick={generateWalletSeeds}>
                  Generate seeds
                </Button>
              </Stack>
            </Stack>
          </form>
        )}

        {tab === 1 && (
          <form onSubmit={onCreateIndependent}>
            <Stack spacing={2}>
              <Alert severity="info">
                Independent identities have a separate delegate key — better privacy but more
                operationally complex. You must hold three mnemonic seeds.
              </Alert>
              <TextField
                label="Identity Seed"
                value={identitySeed}
                onChange={(e) => setIdentitySeed(e.target.value)}
                size="small"
                fullWidth
              />
              <TextField
                label="Delegate Seed"
                value={delegateSeed}
                onChange={(e) => setDelegateSeed(e.target.value)}
                size="small"
                fullWidth
              />
              <TextField
                label="Security Seed"
                value={securitySeed}
                onChange={(e) => setSecuritySeed(e.target.value)}
                size="small"
                fullWidth
              />
              <Stack direction="row" spacing={1}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<AddIcon />}
                  disabled={!identitySeed || !delegateSeed || !securitySeed}
                >
                  Add identity
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={generateIndependentSeeds}
                >
                  Generate seeds
                </Button>
              </Stack>
            </Stack>
          </form>
        )}

        {tab === 2 && (
          <form onSubmit={onImport}>
            <Stack spacing={2}>
              <Alert severity="info">Paste the JSON export of an identity you previously exported.</Alert>
              <TextField
                label="Import JSON"
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                multiline
                minRows={4}
                fullWidth
              />
              {importError && <Alert severity="error">{importError}</Alert>}
              <Button type="submit" variant="contained" startIcon={<AddIcon />} disabled={!importData}>
                Import identity
              </Button>
            </Stack>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
