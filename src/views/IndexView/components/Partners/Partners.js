import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Partners = () => {
  const theme = useTheme();
  return (
    <Box>
      <Box>
        <Typography
          variant="h4"
          align={'center'}
          data-aos={'fade-up'}
          gutterBottom
          sx={{
            fontWeight: 700,
            marginTop: theme.spacing(1),
          }}
        >
          Partnerships & Integrations
        </Typography>
      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent={'center'}>
        {[
          { img: 'apeswap.png', alt: 'ApeSwap', url: 'https://apeswap.finance/' },
          { img: 'chainlink.png', alt: 'Chainlink', url: 'https://blog.congruentlabs.co/signata-will-leverage-chainlink-oracles-to-power-its-on-chain-identity-management-system/' },
          { img: 'upsurge.png', alt: 'Upsurge Studios', url: 'https://blog.congruentlabs.co/announcing-partnership-with-upsurge-studios/' },
          { img: 'ferrum.png', alt: 'Ferrum Network', url: 'https://medium.com/ferrumnetwork/announcing-the-next-staking-project-signata-frm-buyback-c702e5b01725' },
          { img: 'biologica.png', alt: 'Biológica Soluciones', url: 'https://www.biologicasoluciones.com/' },
        ].map((item, i) => (
          <Box
            maxWidth={180}
            marginTop={2}
            marginRight={4}
            key={i}
            component="a"
            href={item.url}
            target="_blank"
          >
            <Box
              component="img"
              height={1}
              width={1}
              src={item.img}
              alt={item.alt}
              sx={{
                filter:
                  theme.palette.mode === 'dark'
                    ? 'brightness(0) invert(0.7)'
                    : 'none',
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Partners;
