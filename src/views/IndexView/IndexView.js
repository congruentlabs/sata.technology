import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import LockIcon from '@mui/icons-material/Lock';
import HubIcon from '@mui/icons-material/Hub';
import Main from 'layouts/Main';
import AddressDisplay from '../../components/AddressDisplay';

const CONTRACTS = [
  {
    label: 'Identity registry',
    address: import.meta.env.VITE_IDENTITY_ADDRESS,
    description:
      'Holds the canonical mapping of identity addresses to delegate/security keys and exposes create/lock/unlock/destroy/rollover operations.',
  },
  {
    label: 'Rights',
    address: import.meta.env.VITE_RIGHTS_ADDRESS,
    description:
      'Tracks which schemas (rights / attestations) an identity holds. Other contracts mint rights against an identity here.',
  },
  {
    label: 'KYC claim',
    address: import.meta.env.VITE_KYC_CLAIM_ADDRESS,
    description:
      'Mints a KYC right against an identity after off-chain verification by a trusted provider.',
  },
  {
    label: 'SATA-100',
    address: import.meta.env.VITE_SATA_100_ADDRESS,
    description:
      'Self-service paid right; a delegate burns SATA to mint a SATA-100 attestation against its identity.',
  },
];

const OPERATIONS = [
  { op: 'create', signedBy: 'Identity key', purpose: 'Bind delegate + security keys to a new identity address.' },
  { op: 'lock', signedBy: 'Delegate key', purpose: 'Temporarily disable an identity (e.g. delegate suspected compromised).' },
  { op: 'unlock', signedBy: 'Security key', purpose: 'Re-enable a locked identity.' },
  { op: 'rollover', signedBy: 'Delegate + security', purpose: 'Rotate to new delegate and/or security keys without changing the identity address.' },
  { op: 'destroy', signedBy: 'Delegate + security', purpose: 'Permanently retire an identity. Irreversible.' },
];

const KEY_ROLES = [
  {
    icon: <FingerprintIcon />,
    name: 'Identity key',
    role: 'The canonical address.',
    detail:
      'Signs the one-time create operation. Never used again — the identity address persists even if the other two keys rotate.',
  },
  {
    icon: <HubIcon />,
    name: 'Delegate key',
    role: 'Day-to-day operator.',
    detail:
      'Signs everything except unlock. Can be a separate keypair (independent identity) or your connected wallet (wallet identity).',
  },
  {
    icon: <LockIcon />,
    name: 'Security key',
    role: 'Recovery + emergency.',
    detail:
      'Co-signs destroy and rollover; sole signer for unlock. Held cold; only touched when the delegate is suspect.',
  },
];

const Section = ({ title, eyebrow, children }) => (
  <Box>
    {eyebrow && (
      <Typography variant="overline" color="primary" sx={{ fontWeight: 600, letterSpacing: 2 }}>
        {eyebrow}
      </Typography>
    )}
    <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mt: eyebrow ? 0.5 : 0 }}>
      {title}
    </Typography>
    {children}
  </Box>
);

const IndexView = () => (
  <Main>
    <Container maxWidth="md" sx={{ pt: { xs: 4, md: 8 }, pb: 8 }}>
      <Stack spacing={6}>
        <Box>
          <Chip
            label="Open-source identity primitives for EVM chains"
            size="small"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            Signata
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, mb: 3 }}>
            A smart-contract identity registry that lets a user own a stable on-chain identity
            separately from any specific wallet, and attach revocable attestations to it.
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <Button
              variant="contained"
              size="large"
              component="a"
              href="https://github.com/congruentlabs"
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNewIcon />}
            >
              GitHub
            </Button>
            <Button
              variant="outlined"
              size="large"
              component="a"
              href="https://docs.signata.net"
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNewIcon />}
            >
              Documentation
            </Button>
          </Stack>
        </Box>

        <Divider />

        <Section eyebrow="Architecture" title="The three-key identity model">
          <Typography variant="body1" color="text.secondary" paragraph>
            Each Signata identity is anchored by a stable address — the <em>identity address</em> —
            and controlled by a triplet of EVM keypairs. Separating the long-lived address from the
            keys that operate on it means the delegate key can be rotated, or a compromised
            delegate locked out, without losing the identity itself or any attestations attached to
            it.
          </Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {KEY_ROLES.map((k) => (
              <Grid item xs={12} md={4} key={k.name}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Box sx={{ color: 'primary.main' }}>{k.icon}</Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {k.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                      {k.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {k.detail}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Section>

        <Section eyebrow="Protocol" title="Registry operations">
          <Typography variant="body1" color="text.secondary" paragraph>
            All five operations on the registry are gated by a precomputed EIP-712 digest. The
            client constructs the digest off-chain, the relevant key signs it, and the on-chain
            verifier recovers the signer and checks it against the stored role. No transaction is
            ever sent by an identity key beyond create.
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Operation</TableCell>
                  <TableCell>Signed by</TableCell>
                  <TableCell>Purpose</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {OPERATIONS.map((row) => (
                  <TableRow key={row.op}>
                    <TableCell sx={{ fontFamily: 'monospace' }}>{row.op}</TableCell>
                    <TableCell>{row.signedBy}</TableCell>
                    <TableCell>{row.purpose}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Section>

        <Section eyebrow="Composability" title="Rights & attestations">
          <Typography variant="body1" color="text.secondary" paragraph>
            Identity is necessary but not sufficient — what matters to a consuming application is
            usually <em>what claims an identity holds</em>. Signata models this with a separate
            Rights contract: any contract can mint a right against an identity, and any other
            contract can check{' '}
            <Box component="code" sx={{ fontFamily: 'monospace' }}>
              holdsTokenOfSchema(identity, schemaId)
            </Box>{' '}
            in a single read. Two reference issuers ship with the protocol:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }} gutterBottom>
                    KYC claim
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Off-chain verified by a trusted provider. The provider issues a salt + signature
                    that the holder relays to <code>claimRight</code>; the contract verifies the
                    provider signature on-chain and mints the right.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }} gutterBottom>
                    SATA-100
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Self-service paid attestation. Approve a fixed SATA amount, call{' '}
                    <code>purchaseRight</code>, and the right is minted against your identity. No
                    off-chain coordination required.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Section>

        <Section eyebrow="Deployment" title="Mainnet contracts">
          <Typography variant="body1" color="text.secondary" paragraph>
            All contracts are deployed on Ethereum mainnet and verified on Etherscan. Source is in
            the open-source repository.
          </Typography>
          <Stack spacing={2}>
            {CONTRACTS.filter((c) => c.address).map((c) => (
              <Card key={c.label} variant="outlined">
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 1,
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {c.label}
                    </Typography>
                    <AddressDisplay address={c.address} variant="body2" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {c.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Section>

        <Section eyebrow="Project status" title="Where this stands">
          <Typography variant="body1" color="text.secondary" paragraph>
            Signata&apos;s identity registry was deployed in 2022 and has not been redeployed since.
            The current front-end is a modern rebuild on top of those original contracts — the
            cryptographic model (EIP-712 digests, three-key separation, <code>ecrecover</code>{' '}
            verification) is therefore older than the patterns most 2025 dApps would reach for, but
            it works against the deployed contracts.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Newer alternatives worth comparing against:{' '}
            <Link href="https://attest.org" target="_blank" rel="noopener noreferrer">
              EAS
            </Link>{' '}
            for general attestations, and{' '}
            <Link href="https://erc4337.io" target="_blank" rel="noopener noreferrer">
              ERC-4337 smart accounts
            </Link>{' '}
            for the &quot;identity as a contract&quot; pattern. The repository is open source —
            contributions and forks welcome.
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              component="a"
              href="https://github.com/congruentlabs/sata.technology"
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNewIcon />}
            >
              Front-end source
            </Button>
            <Button
              variant="outlined"
              component="a"
              href="https://blog.congruentlabs.co/"
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNewIcon />}
            >
              Blog
            </Button>
          </Stack>
        </Section>
      </Stack>
    </Container>
  </Main>
);

export default IndexView;
