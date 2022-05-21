import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BigNumber } from 'ethers';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Octokit } from 'octokit';
import { formatUnits, parseUnits } from '@ethersproject/units';
import { useEthers, useTokenBalance, useTokenAllowance } from '@usedapp/core';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Torus from '@toruslabs/torus-embed';
import numeral from 'numeral';
import WalletLink from 'walletlink';
// import Fortmatic from 'fortmatic';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

import { useExchange, useApprove } from './hooks';

const octokit = new Octokit();

const sataAddress = '0x3ebb4A4e91Ad83BE51F8d596533818b246F4bEe1';
const dSataAddress = '0x49428f057dd9d20a8e4c6873e98afd8cd7146e3b';
const exchangerAddress = '0xB321feAa9018C20e94a5c4F3bf44EADEbfCF7E6C';

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
  const dSataBalance = useTokenBalance(dSataAddress, account);
  const allowance = useTokenAllowance(sataAddress, account, exchangerAddress);
  const { state: exchState, send: exchSend, resetState: exchResetState } = useExchange();
  const { state: approveState, send: approveSend, resetState: approveResetState } = useApprove();
  const [actualAmount, setActualAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const ghIssues = await octokit.request('GET /repos/congruentlabs/signata-dao/issues');
      console.log(ghIssues.data);
      setIssues(ghIssues.data);
    };

    getData();
  }, []);

  useEffect(() => {
    if (approveState) {
      console.log(approveState);
      if (approveState.status === 'PendingSignature') {
        setLoading(true);
      }
      if (approveState.status === 'Exception') {
        setLoading(false);
      }
      if (approveState.status === 'None') {
        setLoading(false);
      }
      if (approveState.status === 'Mining') {
        setLoading(true);
      }
      if (approveState.status === 'Success') {
        setLoading(false);
      }
    }
  }, [approveState]);

  useEffect(() => {
    if (exchState) {
      console.log(exchState);
      if (exchState.status === 'PendingSignature') {
        setLoading(true);
      }
      if (exchState.status === 'Exception') {
        setLoading(false);
      }
      if (exchState.status === 'None') {
        setLoading(false);
      }
      if (exchState.status === 'Mining') {
        setLoading(true);
      }
      if (exchState.status === 'Success') {
        setLoading(false);
      }
    }
  }, [exchState]);


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
    if (chainId && chainId !== 1) {
      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1' }]
      });
    }
  }, [chainId]);

  const handleClickPercentage = (e, val) => {
    e.preventDefault();
    const newAmount = sataBalance.div(100).mul(val);
    setActualAmount(newAmount);
    setAmount(formatUnits(newAmount || 0, 18));
  };

  const handleChangeAmount = (e) => {
    e.preventDefault();
    try {
      const newAmount = e.target.value;
      const parsedAmount = parseUnits(newAmount);
      if (parsedAmount.gt(sataBalance) || parsedAmount.isNegative()) {
        setActualAmount(sataBalance);
        setAmount(formatUnits(sataBalance || 0, 18));
      } else {
        setActualAmount(parsedAmount);
        setAmount(newAmount);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickApprove = () => {
    approveResetState();
    approveSend(exchangerAddress, BigNumber.from(actualAmount));
  };

  const handleClickExchange = () => {
    exchResetState();
    exchSend(actualAmount);
  };

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            DAO Proposals
          </Typography>
          <Typography variant="body1">
          The Signata Decentralized Autonomous Organization (DAO) is managed on GitHub. Use the links below to view the current proposals and discuss them before they move to voting.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="issues table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="left">#</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Comments</TableCell>
                  <TableCell align="center">Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {issues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell align="left">{issue.number}</TableCell>
                    <TableCell component="th" scope="row">
                      {issue.title}
                    </TableCell>
                    <TableCell align="center">{issue.state}</TableCell>
                    <TableCell align="center">{issue.comments}</TableCell>
                    <TableCell align="center">
                      <Button target="_blank" href={issue.html_url} size="small" variant="outlined">
                        View on GitHub
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            DAO Voting
          </Typography>
          <Typography variant="body1">
            The Signata DAO uses Tally.xyz for on-chain proposals and voting. Use Tally to vote, delegate your voting power, and more.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            target="_blank"
            href="https://www.tally.xyz/governance/eip155:1:0x3D3255D21654B9a8325DfE6353ac6B37352Eb80B"
            size="large"
            variant="outlined"
          >
            Open Tally.xyz
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            SATA to dSATA Exchange
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
          >
            SATA cannot be used for voting in the Signata DAO. To vote in proposals you must hold dSATA
            instead. If you wish to convert your SATA to dSATA, you can perform a one-way migration of
            your SATA tokens while the migration period is open.
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
          >
            The migration period ends at <b>2022-05-20 13:00 UTC</b>.
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
          >
            SATA remains as a utility token that powers the identity ecosystem. dSATA provides the power
            to vote on the SATA treasury, the project, and the dSATA treasury.
          </Typography>
          <Typography
            variant="body1"
            color="red"
            gutterBottom
          >
            The price of dSATA is not the same as SATA, they are independent tokens with different liquidity
            pools. No bridge will be made to allow swapping between the tokens after the migration ends. Review the
            published information here to decide if you wish to migrate your SATA or not.
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
          <Grid item xs={12}>
            <Stack spacing={1}>
              <Alert severity="success" variant="outlined">
                <AlertTitle>Connected Wallet</AlertTitle>
                {account}
              </Alert>
              <Alert severity={chainId === 1 ? 'success' : 'error'} variant="outlined">
                <AlertTitle>Connected Network</AlertTitle>
                {chainId === 1 ? 'Ethereum Mainnet' : 'Wrong Network - Please switch to Ethereum!'}
              </Alert>
              <Typography variant="text2">
                Choose how much of your SATA balance to migrate. To migrate, the amount you choose will swap your SATA
                balance for dSATA. If you choose 100%, you will swap all of your SATA for dSATA. If you choose 50%, half
                of your SATA will be swapped for dSATA.
              </Typography>
              <Typography variant="text2" color="red">
                Migration of SATA to dSATA is a one-way transaction, you cannot migrate dSATA back to SATA. The price of
                dSATA and SATA are both set by secondary markets and not guaranteed when migrating tokens. You will
                receive a 1-to-1 amount of dSATA for every SATA you migrate.
              </Typography>
              <Typography variant="text2">
                dSATA will not be able to be used for utility services within the SATA ecosystem. SATA will not be
                able to be used to vote in Signata governance proposals. Each token serves a specific purpose, and
                you must choose what you wish to use your SATA holdings for. dSATA will only be available on the Ethereum, and SATA
                will continue to be available on multiple chains.
              </Typography>
              <Alert severity="info" sx={{ fontFamily: 'monospace' }}>
                <AlertTitle>Your SATA Balance</AlertTitle>
                {fNumber(formatUnits(sataBalance || 0, 18))} SATA
              </Alert>
              <ButtonGroup variant="outlined" color="secondary" fullWidth size="small">
                <Button onClick={(e) => handleClickPercentage(e, 25)}>
                  25%
                </Button>
                <Button onClick={(e) => handleClickPercentage(e, 50)}>
                  50%
                </Button>
                <Button onClick={(e) => handleClickPercentage(e, 75)}>
                  75%
                </Button>
                <Button onClick={(e) => handleClickPercentage(e, 100)}                >
                  100%
                </Button>
              </ButtonGroup>
              <TextField
                value={amount}
                label="Amount of SATA to exchange for dSATA"
                onChange={handleChangeAmount}
                variant="outlined"
              />
              {allowance < actualAmount ? (
                <Button
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  onClick={handleClickApprove}
                >
                  APPROVE
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  onClick={handleClickExchange}
                >
                  MIGRATE TO dSATA
                </Button>
              )}
              {isLoading && <LinearProgress />}
              {exchState && exchState.status === 'Success' && (
                <Alert severity="success">
                  <AlertTitle>Transaction Complete!</AlertTitle>
                </Alert>
              )}
              {exchState && exchState.status === 'Mining' && (
                <Alert severity="info">
                  <AlertTitle>Transaction Pending...</AlertTitle>
                </Alert>
              )}
              {exchState && exchState.status === 'PendingSignature' && (
                <Alert severity="info">
                  <AlertTitle>Waiting for Wallet Signature</AlertTitle>
                </Alert>
              )}
              {exchState && exchState.status === 'Exception' && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {exchState.errorMessage}
                </Alert>
              )}
              {approveState && approveState.status === 'PendingSignature' && (
                <Alert severity="info">
                  <AlertTitle>Waiting for Wallet Signature</AlertTitle>
                </Alert>
              )}
              {approveState && approveState.status === 'Exception' && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {approveState.errorMessage}
                </Alert>
              )}
              {approveState && approveState.status === 'Mining' && (
                <Alert severity="info">
                  <AlertTitle>Transaction Pending...</AlertTitle>
                </Alert>
              )}
              <Alert severity="info" sx={{ fontFamily: 'monospace' }}>
                <AlertTitle>Your dSATA Balance</AlertTitle>
                {fNumber(formatUnits(dSataBalance || 0, 18))} dSATA
              </Alert>
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
            href: 'https://app.uniswap.org/#/swap?outputCurrency=0x49428f057dd9d20a8e4c6873e98afd8cd7146e3b',
            disabled: false,
          }
        ].map((item, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Box
              component={item.disabled ? '' : 'a'}
              href={item.href}
              target="_blank"
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
                    width: { xs: 1 },
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
