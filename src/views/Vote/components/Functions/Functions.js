import React, { useEffect, useMemo, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
import { erc20Abi, formatUnits, parseUnits } from 'viem';
import {
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useSwitchChain,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import numeral from 'numeral';
import {
  SATA_ADDRESS,
  DSATA_ADDRESS,
  EXCHANGER_ADDRESS,
  EXCHANGE_ABI,
  useTokenBalance,
  useTokenAllowance,
} from './hooks';

const octokit = new Octokit();
const GOVERNOR_ADDRESS = import.meta.env.VITE_GOVERNOR_ADDRESS;
const GH_OWNER = import.meta.env.VITE_DAO_GH_OWNER || 'congruentlabs';
const GH_REPO = import.meta.env.VITE_DAO_GH_REPO || 'signata-dao';

export function fNumber(number) {
  return numeral(number).format();
}

const Functions = () => {
  const theme = useTheme();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { connect, isPending: connectPending, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();

  const sataBalance = useTokenBalance(SATA_ADDRESS);
  const dSataBalance = useTokenBalance(DSATA_ADDRESS);
  const allowance = useTokenAllowance(SATA_ADDRESS, EXCHANGER_ADDRESS);

  const {
    data: approveHash,
    isPending: approvePending,
    writeContract: writeApprove,
    error: approveError,
    reset: resetApprove,
  } = useWriteContract();
  const approveReceipt = useWaitForTransactionReceipt({ hash: approveHash });

  const {
    data: exchangeHash,
    isPending: exchangePending,
    writeContract: writeExchange,
    error: exchangeError,
    reset: resetExchange,
  } = useWriteContract();
  const exchangeReceipt = useWaitForTransactionReceipt({ hash: exchangeHash });

  const [amount, setAmount] = useState('0');
  const [issues, setIssues] = useState([]);

  const actualAmount = useMemo(() => {
    try {
      return parseUnits(amount || '0', 18);
    } catch {
      return 0n;
    }
  }, [amount]);

  const isLoading =
    approvePending || exchangePending || approveReceipt.isLoading || exchangeReceipt.isLoading;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await octokit.request('GET /repos/{owner}/{repo}/issues', {
          owner: GH_OWNER,
          repo: GH_REPO,
        });
        if (!cancelled) setIssues(res.data);
      } catch (err) {
        console.error('Failed to load DAO proposals', err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (isConnected && chainId !== mainnet.id) {
      switchChain?.({ chainId: mainnet.id });
    }
  }, [chainId, isConnected, switchChain]);

  const handleClickPercentage = (e, val) => {
    e.preventDefault();
    const newAmount = (sataBalance * BigInt(val)) / 100n;
    setAmount(formatUnits(newAmount, 18));
  };

  const handleChangeAmount = (e) => {
    e.preventDefault();
    const next = e.target.value;
    try {
      const parsed = parseUnits(next || '0', 18);
      if (parsed > sataBalance || parsed < 0n) {
        setAmount(formatUnits(sataBalance, 18));
      } else {
        setAmount(next);
      }
    } catch {
      // ignore invalid intermediate input
      setAmount(next);
    }
  };

  const handleClickApprove = () => {
    resetApprove();
    writeApprove({
      address: SATA_ADDRESS,
      abi: erc20Abi,
      functionName: 'approve',
      args: [EXCHANGER_ADDRESS, actualAmount],
    });
  };

  const handleClickExchange = () => {
    resetExchange();
    writeExchange({
      address: EXCHANGER_ADDRESS,
      abi: EXCHANGE_ABI,
      functionName: 'exchange',
      args: [actualAmount],
    });
  };

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            DAO Proposals
          </Typography>
          <Typography variant="body1">
            The Signata Decentralized Autonomous Organization (DAO) is managed on GitHub. Use the
            links below to view the current proposals and discuss them before they move to voting.
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
            The Signata DAO uses Tally.xyz for on-chain proposals and voting. Use Tally to vote,
            delegate your voting power, and more.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            target="_blank"
            href={`https://www.tally.xyz/governance/eip155:1:${GOVERNOR_ADDRESS}`}
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
          <Typography variant="body1" gutterBottom>
            SATA cannot be used for voting in the Signata DAO. To vote in proposals you must hold
            dSATA instead. If you wish to convert your SATA to dSATA, you can perform a one-way
            migration of your SATA tokens while the migration period is open.
          </Typography>
          <Typography variant="body1" gutterBottom>
            SATA remains as a utility token that powers the identity ecosystem. dSATA provides the
            power to vote on the SATA treasury, the project, and the dSATA treasury.
          </Typography>
          <Typography variant="body1" color="error" gutterBottom>
            The price of dSATA is not the same as SATA â€” they are independent tokens with different
            liquidity pools. No bridge will be made to allow swapping between the tokens after the
            migration ends. Review the published information here to decide if you wish to migrate
            your SATA or not.
          </Typography>
        </Grid>
        {!isConnected && (
          <Grid item xs={12} textAlign="center">
            <Stack spacing={1} alignItems="center">
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                disabled={connectPending}
                onClick={() => connect({ connector: injected() })}
              >
                {connectPending ? 'Connecting…' : 'Connect Wallet'}
              </Button>
              {connectError && (
                <Alert severity="error" variant="outlined">
                  {connectError.shortMessage || connectError.message}
                </Alert>
              )}
              <Typography variant="caption" color="text.secondary">
                Requires a browser wallet extension (MetaMask, Rabby, Brave, Coinbase Wallet, etc.)
              </Typography>
            </Stack>
          </Grid>
        )}
        {isConnected && (
          <Grid item xs={12}>
            <Stack spacing={1}>
              <Alert
                severity="success"
                variant="outlined"
                action={
                  <Button size="small" onClick={() => disconnect()}>
                    Disconnect
                  </Button>
                }
              >
                <AlertTitle>Connected Wallet</AlertTitle>
                {address}
              </Alert>
              <Alert
                severity={chainId === mainnet.id ? 'success' : 'error'}
                variant="outlined"
                action={
                  chainId !== mainnet.id && (
                    <Button
                      size="small"
                      onClick={() => switchChain?.({ chainId: mainnet.id })}
                    >
                      Switch
                    </Button>
                  )
                }
              >
                <AlertTitle>Connected Network</AlertTitle>
                {chainId === mainnet.id
                  ? 'Ethereum Mainnet'
                  : 'Wrong Network â€” please switch to Ethereum'}
              </Alert>
              <Alert severity="info" sx={{ fontFamily: 'monospace' }}>
                <AlertTitle>Your SATA Balance</AlertTitle>
                {fNumber(formatUnits(sataBalance, 18))} SATA
              </Alert>
              <ButtonGroup variant="outlined" color="secondary" fullWidth size="small">
                <Button onClick={(e) => handleClickPercentage(e, 25)}>25%</Button>
                <Button onClick={(e) => handleClickPercentage(e, 50)}>50%</Button>
                <Button onClick={(e) => handleClickPercentage(e, 75)}>75%</Button>
                <Button onClick={(e) => handleClickPercentage(e, 100)}>100%</Button>
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
                  disabled={isLoading || actualAmount === 0n}
                  onClick={handleClickApprove}
                >
                  APPROVE
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  disabled={isLoading || actualAmount === 0n}
                  onClick={handleClickExchange}
                >
                  MIGRATE TO dSATA
                </Button>
              )}
              {isLoading && <LinearProgress />}
              {exchangeReceipt.isSuccess && (
                <Alert severity="success">
                  <AlertTitle>Transaction Complete!</AlertTitle>
                </Alert>
              )}
              {exchangeReceipt.isLoading && (
                <Alert severity="info">
                  <AlertTitle>Transaction Pending...</AlertTitle>
                </Alert>
              )}
              {exchangePending && (
                <Alert severity="info">
                  <AlertTitle>Waiting for Wallet Signature</AlertTitle>
                </Alert>
              )}
              {exchangeError && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {exchangeError.shortMessage || exchangeError.message}
                </Alert>
              )}
              {approvePending && (
                <Alert severity="info">
                  <AlertTitle>Waiting for Wallet Signature</AlertTitle>
                </Alert>
              )}
              {approveReceipt.isLoading && (
                <Alert severity="info">
                  <AlertTitle>Approval Pending...</AlertTitle>
                </Alert>
              )}
              {approveError && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {approveError.shortMessage || approveError.message}
                </Alert>
              )}
              <Alert severity="info" sx={{ fontFamily: 'monospace' }}>
                <AlertTitle>Your dSATA Balance</AlertTitle>
                {fNumber(formatUnits(dSataBalance, 18))} dSATA
              </Alert>
            </Stack>
          </Grid>
        )}
        {[
          {
            image: 'claim.png',
            description:
              'SATA and dSATA serve distinct purposes. You can learn more by clicking here.',
            title: 'About dSATA',
            button: 'Learn More',
            href: 'https://blog.congruentlabs.co/launching-the-signata-dao',
            disabled: false,
          },
          {
            image: 'dsata-token.png',
            description:
              'dSATA is an ERC20 token with a 1% Uniswap buy and sell tax. All taxes collected are used to increase SATA liquidity.',
            description2:
              'dSATA was launched with 50 million total supply. 25 million tokens have been provided as liquidity on Uniswap. 25 million tokens will be made available for migrating SATA holders.',
            title: 'dSATA Token',
            button: 'Buy dSATA on Uniswap',
            href: `https://app.uniswap.org/#/swap?outputCurrency=${DSATA_ADDRESS}`,
            disabled: false,
          },
        ].map((item, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Box
              component={item.disabled ? 'div' : 'a'}
              href={item.href}
              target="_blank"
              display="block"
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
                display="flex"
                justifyContent={{ xs: 'center', md: 'flex-start' }}
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
                      variant="h4"
                      style={{ fontWeight: 600 }}
                      gutterBottom
                      sx={{ color: 'common.white' }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: 'common.white', opacity: 0.8 }}
                      gutterBottom
                    >
                      {item.description}
                    </Typography>
                    {item.description2 && (
                      <Typography
                        variant="body2"
                        sx={{ color: 'common.white', opacity: 0.8 }}
                        gutterBottom
                      >
                        {item.description2}
                      </Typography>
                    )}
                  </Box>
                  <Box display="flex">
                    <Typography color={item.disabled ? 'secondary' : 'primary'}>
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
