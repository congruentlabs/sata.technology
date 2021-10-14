import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


const HardwareStorage = () => {
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Grid container spacing={4}>
      <Grid
        item
        container
        alignItems={'center'}
        justifyContent={'center'}
        xs={12}
        md={6}
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
      >
        <Box
          component={LazyLoadImage}
          height={1}
          width={1}
          src={'https://assets.maccarianagency.com/screenshots/dashboard1.jpg'}
          alt="..."
          effect="blur"
          boxShadow={3}
          borderRadius={4}
          maxWidth={600}
          sx={{
            filter: theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
          }}
        />
      </Grid>
      <Grid item container xs={12} md={6} alignItems={'center'}>
        <Box data-aos={isMd ? 'fade-right' : 'fade-up'}>
          <Box marginBottom={2}>
            <Typography
              variant="h4"
              color="text.primary"
              sx={{ fontWeight: 700 }}
            >
              Hardware storage{' '}
              <Typography
                color={'primary'}
                component={'span'}
                variant={'inherit'}
              >
                to keep you safe
              </Typography>
            </Typography>
          </Box>
          <Box marginBottom={4}>
            <Typography variant="h6" component="p" color="text.secondary">
              Signata uses YubiKeys to protect your wallet, your identity, and your online life.
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default HardwareStorage;
