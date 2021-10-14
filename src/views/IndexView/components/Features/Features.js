/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PasswordIcon from '@mui/icons-material/Password';
import ReceiptIcon from '@mui/icons-material/Receipt';
import WarningIcon from '@mui/icons-material/Warning';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import GitHubIcon from '@mui/icons-material/GitHub';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const feats = [
  {
    title: 'Goodbye Passwords',
    subtitle:
      'Replace weak passwords with powerful cryptography.',
    icon: <PasswordIcon />,
  },
  {
    title: 'NFT Rights',
    subtitle:
      'Prove your identity and access services using Non-Fungible Tokens.',
    icon: <ReceiptIcon />,
  },
  {
    title: 'Manage Risk',
    subtitle:
      'Protect valuable transactions on-chain from identity theft.',
    icon: <WarningIcon />,
  },
  {
    title: 'Preserve your Privacy',
    subtitle:
      'Protect your identity from mass surveillance and advertisers.',
    icon: <PrivacyTipIcon />,
  },
  {
    title: 'Open and Decentralized',
    subtitle: 'Open source contracts and off-chain services.',
    icon: <GitHubIcon />,
  },
  {
    title: 'Multi-Network Support',
    subtitle:
      'Identity is needed everywhere, not just a single network.',
    icon: <SwapHorizIcon />,
  },
];

const Features = () => {
  const theme = useTheme();
  return (
    <Grid container spacing={4}>
      {feats.map((item, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <Box
            component={Card}
            padding={4}
            borderRadius={4}
            width={1}
            height={1}
            data-aos={'fade-up'}
            data-aos-delay={i * 100}
          >
            <Box display={'flex'} flexDirection={'column'}>
              <Box
                component={Avatar}
                width={50}
                height={50}
                marginBottom={2}
                bgcolor={theme.palette.primary.main}
                color={theme.palette.background.paper}
              >
                {item.icon}
              </Box>
              <Typography
                variant={'h6'}
                gutterBottom
                sx={{ fontWeight: 500 }}
              >
                {item.title}
              </Typography>
              <Typography color="text.secondary">{item.subtitle}</Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Features;
