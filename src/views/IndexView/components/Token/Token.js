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
          <Typography sx={{ fontWeight: 700 }} variant={'h4'} gutterBottom>
            Blockchains are the new engine powering humanity. Be a part of the
            decentralized identity future.
          </Typography>
          <Typography variant={'h6'} component={'p'} color={'text.secondary'}>
            The SATA token connects and powers the Signata identity ecosystem:
          </Typography>
          <ul>
            <Typography variant={'h6'} component={'li'} color={'text.secondary'}>
              Users pay for rights with SATA
            </Typography>
            <Typography variant={'h6'} component={'li'} color={'text.secondary'}>
              Services verify identities using SATA
            </Typography>
            <Typography variant={'h6'} component={'li'} color={'text.secondary'}>
              SATA holders stake to earn governance rights
            </Typography>
            <Typography variant={'h6'} component={'li'} color={'text.secondary'}>
              Services stake SATA to protect service integrity
            </Typography>
            <Typography variant={'h6'} component={'li'} color={'text.secondary'}>
              Bridges link SATA to multiple blockchains
            </Typography>
          </ul>
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
