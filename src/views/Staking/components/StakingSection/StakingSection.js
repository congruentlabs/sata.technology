import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const mock = [
  {
    image: 'governance-partner.png',
    desc1: 'Partner Pool',
    desc2: 'Exclusive for Project Partners & Affiliates',
    title: '1,000,000 SATA',
    subtitle1: '120% APR',
    subtitle2: '180 Days Maturity Period',
    color: '#000000',
    url: 'https://stake.unifyre.io/signata/info/0x635315aa539d49b426784af9616e2ef9262ff7ba',
    buttonText: 'View the Pool',
    buttonColor: 'secondary',
  },
  {
    image: 'governance-standard.png',
    desc1: 'Standard Pool',
    desc2: 'For Enhanced Governance Rights',
    title: '2,000,000 SATA',
    subtitle1: '60% APR',
    subtitle2: '180 Days Maturity Period',
    color: '#000000',
    url: 'https://stake.unifyre.io/signata/info/0x5dbaa82b59262e585ee7a53121bfad92b60ea0b7',
    buttonText: 'View the Pool',
    buttonColor: 'secondary',
  },
  {
    image: 'governance-liquidity.png',
    desc1: 'Liquidity Provider Pool',
    desc2: 'For Enhanced Governance Rights',
    title: '30,000 UNI V2 SATA/ETH',
    subtitle1: '90% APR',
    subtitle2: '180 Days Maturity Period',
    color: '#000000',
    url: 'https://stake.unifyre.io/signataliq/info/0x55661573219a8ee6d5b87b36a07639c2c00e7df2',
    buttonText: 'View the Pool',
    buttonColor: 'secondary',
  },
  {
    image: 'governance-standard-2.png',
    desc1: 'Standard Pool Phase 2',
    desc2: 'For Enhanced Governance Rights',
    title: '5,000,000 SATA',
    subtitle1: '60% APR',
    subtitle2: '180 Days Maturity Period',
    color: '#000000',
    url: 'https://stake.unifyre.io/signata/info/0x6333f546510a365da98f969b3c9603dd253336a9',
    buttonText: 'View the Pool',
    buttonColor: 'secondary',
  },
];

const StakingSection = () => {
  const theme = useTheme();
  return (
    <Box>
      <Grid container spacing={2}>
        {mock.map((item, i) => (
          <Grid key={i} item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 4,
                '&:hover': {
                  '& img': {
                    transform: 'scale(1.2)',
                  },
                },
                '& .lazy-load-image-loaded': {
                  display: 'flex !important',
                },
              }}
            >
              <Box
                component={LazyLoadImage}
                height={1}
                width={1}
                src={item.image}
                alt="..."
                effect="blur"
                minHeight={{ xs: 400, md: 600 }}
                sx={{
                  transition: 'transform .7s ease !important',
                  transform: 'scale(1.0)',
                  objectFit: 'cover',
                  filter:
                    theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
                }}
              />
              <Box
                position={'absolute'}
                bottom={0}
                left={0}
                right={0}
                padding={3}
                sx={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 2%, ${item.color})`,
                }}
              >
                <Typography
                  variant={'h2'}
                  fontWeight={700}
                  sx={{ color: 'common.white' }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant={'h3'}
                  sx={{ color: 'common.white' }}
                  gutterBottom
                >
                  {item.desc1}
                </Typography>
                <Typography
                  variant={'h4'}
                  sx={{ color: 'common.white' }}
                >
                  {item.subtitle1}
                </Typography>
                <Typography
                  variant={'h4'}
                  sx={{ color: 'common.white' }}
                  gutterBottom
                >
                  {item.subtitle2}
                </Typography>
                <Typography
                  variant={'h6'}
                  sx={{ color: 'common.white' }}
                  gutterBottom
                >
                  {item.desc2}
                </Typography>
                <Button
                  size={'large'}
                  variant={'contained'}
                  color={item.buttonColor}
                  href={item.url}
                  target="_blank"
                >
                  {item.buttonText}
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Typography
            variant={'overline'}
            component="p"
          >
            Staking Powered By
          </Typography>
          <img
            alt="Ferrum Network Logo"
            src="ferrum-alt.png"
            style={{
              objectFit: 'cover',
              maxWidth: '400px',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StakingSection;
