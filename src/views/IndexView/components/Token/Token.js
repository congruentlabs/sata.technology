/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Token = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Box>
      <Grid container spacing={4} direction={isMd ? 'row' : 'column-reverse'}>
        <Grid item xs={12} md={6} data-aos={isMd ? 'fade-right' : 'fade-up'}>
          <Box marginBottom={4}>
            <Typography sx={{ fontWeight: 700 }} variant={'h4'} gutterBottom>
              Blockchains are the new engine powering humanity. Be a part of the
              decentralized identity future.
            </Typography>
            <Typography variant={'h6'} component={'p'} color={'text.secondary'}>
              The SATA token connects and powers the Signata identity ecosystem.
              Users pay for rights with SATA. Services verify identities using
              SATA. Project expansion is governed by SATA holders.
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" color={'primary'} gutterBottom>
                100,000,000 SATA
              </Typography>
              <Typography color="text.secondary" component="p">
                Maximum Supply
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" color={'primary'} gutterBottom>
                0x3ebb4A4e91Ad83BE51F8d596533818b246F4bEe1
              </Typography>
              <Typography color="text.secondary" component="p">
                ERC-20 (ETH) Contract Address
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" color={'primary'} gutterBottom>
                Coming Soon!
              </Typography>
              <Typography color="text.secondary" component="p">
                BEP-20 (BSC) Contract Address
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
          md={6}
          data-aos={'zoom-in'}
          sx={{
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <Box component={Card} boxShadow={4} height={1} width={1}>
            <Box
              component={CardMedia}
              height={1}
              width={1}
              minHeight={300}
              image="blockchain.jpg"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Token;
