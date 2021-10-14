import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

const Links = () => {
  const theme = useTheme();
  return (
    <Box>
      <Box display="flex" flexWrap="wrap" justifyContent={'center'}>
        {[
          { img: 'etherscan-logo.png', alt: 'Etherscan', url: 'https://etherscan.io/token/0x3ebb4a4e91ad83be51f8d596533818b246f4bee1' },
          { img: 'coingecko.png', alt: 'CoinGecko', url: 'https://www.coingecko.com/en/coins/signata' },
          { img: 'coinmarketcap.svg', alt: 'CoinMarketCap', url: 'https://coinmarketcap.com/currencies/signata/' },
          { img: 'timex.svg', alt: 'TimeX', url: 'https://timex.io/?refcode=Adyz2tRxBuMyvuh0' },
          { img: 'coinsbit.png', alt: 'Coinsbit.io', url: 'https://coinsbit.io/referral/1be5f6ca-f462-4e0f-ac5d-a4a7ab00c80e' },
          { img: 'p2pb2b.svg', alt: 'p2pb2b.io', url: 'https://p2pb2b.io?referral=d8b84618' },
          { img: 'uniswap.png', alt: 'Uniswap', url: 'https://app.uniswap.org/#/swap?outputCurrency=0x3ebb4A4e91Ad83BE51F8d596533818b246F4bEe1' },
          { img: 'sushiswap.png', alt: 'Sushiswap', url: 'https://app.sushi.com/#/swap?outputCurrency=0x3ebb4a4e91ad83be51f8d596533818b246f4bee1' },
        ].map((item, i) => (
          <Box
            maxWidth={160}
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

export default Links;
