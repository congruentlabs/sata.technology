import React from 'react';
import Typed from 'react-typed';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTranslation } from 'react-i18next';
import { alpha, useTheme } from '@mui/material/styles';

import Container from 'components/Container';

const images = [
  {
    group: [
      {
        cover:
          '1.jpg',
        coverDark:
          '1.jpg',
      },
      {
        cover:
          '9.jpg',
        coverDark:
          '9.jpg',
      },
    ],
  },
  {
    group: [
      {
        cover:
          '3.jpg',
        coverDark:
          '3.jpg',
      },
      {
        cover:
          '4.jpg',
        coverDark:
          '4.jpg',
      },
      {
        cover:
          '6.jpg',
        coverDark:
          '6.jpg',
      },
    ],
  },
  {
    group: [
      {
        cover:
          '5.jpg',
        coverDark:
          '5.jpg',
      },
      {
        cover:
          '7.jpg',
        coverDark:
          '7.jpg',
      },
      {
        cover:
          '8.jpg',
        coverDark:
          '8.jpg',
      },
      {
        cover:
          '2.jpg',
        coverDark:
          '2.jpg',
      },
    ],
  },
];

const Hero = () => {
  const theme = useTheme();
  // const { t } = useTranslation();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(to bottom, ${alpha(
          theme.palette.background.paper,
          0,
        )}, ${alpha(theme.palette.alternate.main, 1)} 100%)`,
        backgroundRepeat: 'repeat-x',
        position: 'relative',
      }}
    >
      <Box paddingY={{ xs: 0, sm: '4rem', md: '8rem' }}>
        <Container>
          <Box maxWidth={{ xs: 1, sm: '50%' }}>
            <Typography
              variant="h3"
              color="text.primary"
              gutterBottom
              sx={{
                fontWeight: 700,
              }}
            >
              The future of
              <br />
              <Typography
                color={'primary'}
                component={'span'}
                variant={'inherit'}
              >
                <Typed
                  strings={['Identity.', 'Authentication.', 'Payments.', 'Privacy.']}
                  typeSpeed={100}
                  loop={true}
                />
              </Typography>
            </Typography>
            <Typography
              variant="h6"
              component="p"
              color="text.secondary"
              sx={{ fontWeight: 400 }}
            >
              Welcome to Signata, your private identity for the web3 future.
            </Typography>
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
                href="/sata-whitepaper-2021-03-24.pdf"
                download
              >
                Read the Whitepaper
              </Button>
              <Box
                marginTop={{ xs: 2, sm: 0 }}
                marginLeft={{ sm: 2 }}
                width={{ xs: '100%', md: 'auto' }}
              >
                <Button
                  component={'a'}
                  href="https://t.me/satatoken"
                  rel="noopener noreferrer"
                  target="_blank"
                  variant="outlined"
                  color="primary"
                  size="large"
                  fullWidth={isMd ? false : true}
                >
                  Telegram
                </Button>
              </Box>
              <Box
                marginTop={{ xs: 2, sm: 0 }}
                marginLeft={{ sm: 2 }}
                width={{ xs: '100%', md: 'auto' }}
              >
                <Button
                  component={'a'}
                  href="https://discord.gg/pEJu4ZjnfX"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  color="primary"
                  size="large"
                  fullWidth={isMd ? false : true}
                >
                  Discord
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
        <Box
          sx={{
            transform: 'rotate(-20deg)',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Box
            display={'flex'}
            width={'50rem'}
            left={'50%'}
            top={0}
            position={'absolute'}
            sx={{ transform: 'translate3d(20%, -50%, 0)' }}
          >
            {images.map((item, i) => (
              <Box key={i} marginTop={{ sm: -(i * 16) }} marginX={1}>
                {item.group.map((g, j) => (
                  <Box
                    key={j}
                    padding={1}
                    bgcolor={'background.paper'}
                    borderRadius={3}
                    boxShadow={3}
                    marginTop={2}
                  >
                    <Box
                      component={LazyLoadImage}
                      effect="blur"
                      src={
                        theme.palette.mode === 'dark' ? g.coverDark : g.cover
                      }
                      height={1}
                      width={1}
                      maxWidth={320}
                    />
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        component={'svg'}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 1920 100.1"
        sx={{
          width: '100%',
          marginBottom: theme.spacing(-1),
        }}
      >
        <path
          fill={theme.palette.background.paper}
          d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
        ></path>
      </Box>
    </Box>
  );
};

export default Hero;
