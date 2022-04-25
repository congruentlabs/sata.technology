import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

const mock = [
  {
    image: 'vote.png',
    description: 'Stake SATA to earn voting rights.',
    title: 'Governance Staking',
    button: 'Open Staking Pools',
    href: '/staking',
    disabled: false,
  },
  {
    image: 'governance-partner.png',
    description: 'Vote to grow the ecosystem.',
    title: 'Voting',
    button: 'Open the DAO Dashbooard',
    href: '/vote',
    disabled: false,
  },
  {
    image: 'bridge.png',
    description: 'Move SATA between supported blockchains.',
    title: 'Token Bridge',
    button: 'Open the Bridge',
    href: 'https://bridge.sata.technology/',
    disabled: false,
  },
];

const Functions = () => {
  const theme = useTheme();
  return (
    <Box>
      <Grid container spacing={4}>
        {mock.map((item, i) => (
          <Grid item xs={12} key={i}>
            <Box
              component={item.disabled ? '' : 'a'}
              href={item.href}
              display={'block'}
              width={1}
              height={1}
              sx={{
                textDecoration: 'none',
                transition: 'all .2s ease-in-out',
                '&:hover': {
                  transform: `translateY(-${theme.spacing(1 / 2)})`,
                },
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
