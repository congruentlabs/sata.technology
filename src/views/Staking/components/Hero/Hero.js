import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';

import Container from 'components/Container';

const Hero = () => {
  useEffect(() => {
    const jarallaxInit = async () => {
      const jarallaxElems = document.querySelectorAll('.jarallax');
      if (!jarallaxElems || (jarallaxElems && jarallaxElems.length === 0)) {
        return;
      }

      const { jarallax } = await import('jarallax');
      jarallax(jarallaxElems, { speed: 0.2 });
    };

    jarallaxInit();
  });

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Box
      className={'jarallax'}
      data-jarallax
      data-speed="0.2"
      position={'relative'}
      minHeight={{ xs: 1200 }}
      display={'flex'}
      alignItems={'center'}
      id="agency__portfolio-item--js-scroll"
    >
      <Box
        className={'jarallax-img'}
        sx={{
          position: 'absolute',
          objectFit: 'cover',
          /* support for plugin https://github.com/bfred-it/object-fit-images */
          fontFamily: 'object-fit: cover;',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundImage:
            'url(vote.png)',
          filter: theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
        }}
      />
      <Container position={'relative'} zIndex={2}>
        <Box>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: 900,
              color: 'common.white',
            }}
          >
            Signata Governance Staking
          </Typography>
          <Typography
            variant="h5"
            component="p"
            color="text.primary"
            sx={{
              color: 'common.white',
            }}
          >
            Join the next generation of project governance using NFTs.
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'stretched', sm: 'flex-start' }}
          marginTop={4}
        >
          <Button
            component={'a'}
            variant="contained"
            color="primary"
            size="large"
            fullWidth={isMd ? false : true}
            href="/nfg-whitepaper-2021-07-31.pdf"
            download
          >
            NFT Governance Whitepaper
          </Button>
          <Box
            marginTop={{ xs: 2, sm: 0 }}
            marginLeft={{ sm: 2 }}
            width={{ xs: '100%', md: 'auto' }}
          >
            <Button
              component={'a'}
              href="https://blog.congruentlabs.co/non-fungible-governance/"
              rel="noopener noreferrer"
              target="_blank"
              variant="outlined"
              color="primary"
              size="large"
              fullWidth={isMd ? false : true}
            >
              Governance Model
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
