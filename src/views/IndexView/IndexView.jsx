import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HubIcon from '@mui/icons-material/Hub';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Main from 'layouts/Main';

const PILLARS = [
  {
    icon: <VerifiedUserIcon />,
    title: 'Standards-respecting',
    body:
      'Accept government-issued credentials in their native format — SD-JWT VC, W3C VC, ISO 18013-5 mDoc — without proposing new issuance standards or asking governments to change anything.',
  },
  {
    icon: <HubIcon />,
    title: 'On-chain projection',
    body:
      'Verify the credential in the browser, then mint an EAS attestation against the holder’s wallet address. No PII ever touches a chain — only the verified outcome and the issuer reference.',
  },
  {
    icon: <AccountTreeIcon />,
    title: 'Many consumers, one credential',
    body:
      'Once an attestation exists, any consumer can verify it in a single read — web3 dApps directly via wagmi/EAS, traditional applications via a Keycloak SPI that maps it into OIDC claims.',
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
          <Chip label="In development" size="small" variant="outlined" sx={{ mb: 2 }} />
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            Signata
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, mb: 3 }}>
            A bridge between government-issued verifiable credentials and the rest of the
            software ecosystem — both web3 and traditional IAM.
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <Button
              variant="contained"
              size="large"
              component="a"
              href="https://github.com/congruentlabs/sata.technology"
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
              href="https://blog.congruentlabs.co/"
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNewIcon />}
            >
              Blog
            </Button>
          </Stack>
        </Box>

        <Divider />

        <Section eyebrow="Problem" title="Government credentials don’t travel">
          <Typography variant="body1" color="text.secondary" paragraph>
            Governments around the world are issuing verifiable digital credentials at scale.
            The EU is rolling out the EUDI Wallet to every citizen by 2026–27. US states are
            issuing mobile drivers licences. Australia’s Digital ID Act 2024 set up the
            Trusted Digital Identity Framework as the federation regime. Holders genuinely
            have these credentials in their phones.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Where they don’t travel: anywhere outside the issuer’s own narrow consumer
            surface. Web3 services rebuild KYC pipelines. Enterprise applications duplicate
            identity verification. Marketplaces and exchanges accept the same proof of age
            three times in a single onboarding. The credentials exist; the consumption layer
            doesn’t.
          </Typography>
        </Section>

        <Section eyebrow="Approach" title="What Signata does">
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {PILLARS.map((p) => (
              <Grid item xs={12} md={4} key={p.title}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Box sx={{ color: 'primary.main' }}>{p.icon}</Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {p.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {p.body}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Section>

        <Section eyebrow="Architecture" title="Three components">
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>A verifier library</strong> that takes a government-issued credential
            and validates the issuer’s signature against a configurable trust registry.
            Runs entirely in the browser; the credential never reaches a server.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>An on-chain projection layer</strong> built on EAS (Ethereum
            Attestation Service). The verified outcome — and only the outcome — is minted as
            an attestation against the holder’s wallet. dApps verify in a single read.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>A Keycloak Service Provider extension</strong> so that any
            application speaking OIDC or SAML can consume the same attestation as an
            ordinary login. Government and enterprise applications gain the ability to
            accept verified credentials with zero web3 awareness in their codebase.
          </Typography>
        </Section>

        <Section eyebrow="Status" title="Where this is">
          <Typography variant="body1" color="text.secondary" paragraph>
            Active design. The credential bridge and the consumer demo are scheduled as the
            first phase of work; the Keycloak extension follows in phase two. Detailed design
            notes live in private working documents.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            The earlier Signata identity registry contracts deployed in 2022 remain on
            Ethereum mainnet, but are not the focus of this work. v2 is a different shape of
            product on a different set of standards (W3C VC, SD-JWT VC, ISO 18013-5, EAS).
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
              Repository
            </Button>
          </Stack>
        </Section>
      </Stack>
    </Container>
  </Main>
);

export default IndexView;
