import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import { formatUnits } from '@ethersproject/units';
import { useEthers, shortenAddress, useTokenBalance } from '@usedapp/core';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Torus from '@toruslabs/torus-embed';
import numeral from 'numeral';
import WalletLink from 'walletlink';
// import Fortmatic from 'fortmatic';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

const sataAddress = '0x3ebb4A4e91Ad83BE51F8d596533818b246F4bEe1';
// const dSataAddress = '0x3ebb4A4e91Ad83BE51F8d596533818b246F4bEe1';

const infuraId = 'dab56da72e89492da5a8e77fbc45c7fa';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId
    }
  },
  binancechainwallet: {
    package: true
  },
  torus: {
    package: Torus
  },
  walletlink: {
    package: WalletLink,
    options: {
      appName: 'Signata',
      infuraId
    }
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: 'Signata', // Required
      infuraId, // Required
      rpc: '', // Optional if `infuraId` is provided; otherwise it's required
      chainId: 1, // Optional. It defaults to 1 if not provided
      darkMode: false // Optional. Use dark theme, defaults to false
    }
  }
};

export function fNumber(number) {
  return numeral(number).format();
}

const web3Modal = new Web3Modal({
  providerOptions
});

const Functions = () => {
  const theme = useTheme();
  const { account, activate, chainId } = useEthers();
  const sataBalance = useTokenBalance(sataAddress, account);

  useEffect(() => {
    console.log(account);
  }, [account]);

  const handleConnect = async () => {
    try {
      const provider = await web3Modal.connect();

      await provider.enable();
      activate(provider);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(chainId);
    if (chainId && chainId !== 1) {
      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1' }]
      });
    }
  }, [chainId]);

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h3">
            dSATA Migration
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            gutterBottom
          >
            SATA cannot be used for voting in the Signata DAO. To vote in proposals you must hold dSATA instead. If you wish to convert your SATA to dSATA, you can perform a one-way migration of your tokens while the migration period is open.
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
          >
            The migration period ends at 2022-04-12 00:00 UTC.
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
          >
            SATA remains as a utility token that powers the identity ecosystem. dSATA provides the power to vote with confidence on the SATA treasury.
          </Typography>
        </Grid>
        {!account && (
          <Grid item xs={12} textAlign="center">
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={handleConnect}
            >
              Connect Web3 Wallet
            </Button>
          </Grid>
        )}
        {account && (
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <Typography variant="text1">
                Connected Wallet: {account && shortenAddress(account)}
              </Typography>
              <Typography variant="text2">
                Connected To: {chainId === 1 ? 'Ethereum' : 'Wrong Network - Please switch to Ethereum!'}
              </Typography>
              
              <Typography variant="text2">
                SATA Balance: {fNumber(formatUnits(sataBalance || 0, 18))} SATA
              </Typography>
              <Typography variant="text2">
                Choose how much of your SATA balance to migrate. To migrate, the amount you choose will swap your SATA balance for dSATA. If you choose 100%, you will swap all of your SATA for dSATA. If you choose 50%, half of your SATA will be swapped for dSATA.
              </Typography>
              <Typography variant="text2">
                Migration of SATA to dSATA is a one-way transaction, you cannot migrate dSATA back to SATA. The price of dSATA and SATA are both set by secondary markets and not guaranteed when migrating tokens. You will receive a 1-to-1 amount of dSATA for every SATA you migrate.
              </Typography>
              <Typography variant="text2">
                You can only migrate the amount of SATA you held at 2022-04-28 00:00 UTC. You can only call this migration function once, so choose carefully the exact amount you wish to migrate if you wish to move to dSATA.
              </Typography>
              <Typography variant="text2">
                dSATA will not be able to be used for utility services within the SATA ecosystem. SATA will not be able to be used to vote in Signata governance proposals. Each token serves a specific purpose, and you must choose what you wish to use your SATA holdings for.
              </Typography>
              <Slider
                defaultValue={100}
                aria-label="Percentage To Migrate"
                valueLabelDisplay="auto"
                step={1}
                min={1}
                max={100}
              />
              <Button
                variant="contained"
                size="large"
                onClick={handleConnect}
              >
                Migrate to dSATA
              </Button>
            </Stack>
          </Grid>
        )}
        {[
          {
            image: 'claim.png',
            description: 'SATA and dSATA serve distinct purposes. You can learn more by clicking here.',
            title: 'About dSATA',
            button: 'Learn More',
            href: 'https://blog.congruentlabs.co/launching-the-signata-dao',
            disabled: false,
          },
          {
            image: 'dsata-token.png',
            description: 'dSATA is a ERC20 token with a 1% Uniswap buy and sell tax. All taxes collected are used to increase SATA liquidity.',
            description2: 'dSATA was launched with 50 million total supply. 25 million tokens have been provided as liquidity on Uniswap. 25 million tokens will be made available for migrating SATA holders. Any tokens that do not migrate before the migration expires will be held by the Signata DAO.',
            title: 'dSATA Token',
            button: 'Buy dSATA on Uniswap',
            href: 'https://app.uniswap.org/#/swap?outputCurrency=<TODO>',
            disabled: false,
          }
        ].map((item, i) => (
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
                  minHeight: 150,
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
                      variant="body1"
                      color="text.secondary"
                      sx={{ color: 'common.white', opacity: 0.8 }}
                      gutterBottom
                    >
                      {item.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ color: 'common.white', opacity: 0.8 }}
                      gutterBottom
                    >
                      {item.description2}
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Typography
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
