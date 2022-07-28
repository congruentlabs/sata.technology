import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

const items = [
  {
    image: 'micah-williams-lmFJOx7hPc4-unsplash.jpg',
    title: 'Identity Manager',
    description: 'Manage your Decentralized Identities.',
    button: 'Open The dApp',
    href: 'https://signata.net',
    disabled: false,
  },
  {
    image: 'callum-blacoe-KcBhBXlYiDg-unsplash.jpg',
    title: 'Veriswap',
    description: 'P2P swaps with the security of Signata.',
    button: 'Open Veriswap',
    href: 'https://veriswap.io',
    disabled: false,
  },
  {
    image: 'governance-partner.png',
    title: 'DAO Proposals',
    description: 'Discuss protocol changes.',
    button: 'View Proposals',
    href: 'https://github.com/congruentlabs/signata-dao/issues',
    disabled: false,
  },
  {
    image: 'vote.png',
    title: 'DAO Voting',
    description: 'Vote on open proposals.',
    button: 'Open the DAO Dashbooard',
    href: 'https://www.tally.xyz/governance/eip155:1:0x3D3255D21654B9a8325DfE6353ac6B37352Eb80B',
    disabled: false,
  },
  {
    image: 'bridge.png',
    title: 'Token Bridge',
    description: 'Move SATA between supported blockchains.',
    button: 'Open the Bridge',
    href: 'https://bridge.sata.technology/',
    disabled: false,
  },
  {
    image: 'sigmund-HsTnjCVQ798-unsplash.jpg',
    title: 'Documentation',
    description: 'Learn how to build with Signata.',
    button: 'Read Docs',
    href: 'https://docs.signata.net/',
    disabled: false,
  },
];

const Functions = () => {
  return (
    <Box>
      <Grid container spacing={4}>
        {items.map((item, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Box
              component={item.disabled ? '' : 'a'}
              href={item.href}
              target="_blank"
              display={'block'}
              width={1}
              height={1}
              sx={{
                textDecoration: 'none',
                transition: 'all .2s ease-in-out',
              }}
            >
              <Box
                component={Card}
                width={1}
                height={1}
                borderRadius={2}
                boxShadow={4}
                display={'flex'}
                justifyContent={{
                  xs: 'center',
                  md: 'flex-start',
                }}
                sx={{
                  minHeight: 300,
                  backgroundImage: `url("${item.image}")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  '&:after': {
                    position: 'absolute',
                    content: '" "',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    zIndex: 1,
                    background: '#161c2d',
                    opacity: 0.7,
                  },
                }}
              >
                <CardContent
                  sx={{
                    position: 'relative',
                    width: { xs: 1, md: '50%' },
                    height: 1,
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    zIndex: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant={'h4'}
                      style={{ fontWeight: 600 }}
                      gutterBottom
                      sx={{ color: 'common.white' }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{ color: 'common.white', opacity: 0.8 }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Typography
                      variant="contained"
                      color={item.disabled ? 'secondary' : 'primary'}
                      size="large"
                      target="_blank"
                      href={item.href}
                      disabled={item.disabled}
                    >
                      {item.button}
                    </Typography>
                  </Box>
                </CardContent>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Functions;
