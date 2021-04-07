import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Button,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  colors,
  ListItemText,
  useMediaQuery,
  useTheme,
  NoSsr,
} from '@material-ui/core';
// import { Alert } from "@material-ui/lab";
import { SectionHeader, IconAlternate } from 'components/molecules';
import { CardBase } from 'components/organisms';
import { Image } from 'components/atoms';
// import { ethers, Contract } from 'ethers';

if (window.ethereum) {
  window.ethereum.on('chainChanged', () => {
    window.location.reload();
  });
}

// const tokenAbi = [
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_owner",
//         "type": "address"
//       }
//     ],
//     "name": "balanceOf",
//     "outputs": [
//       {
//         "name": "balance",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   }
// ];

// const claimAbi = [
//   {
//     "inputs": [],
//     "name": "availableTokens",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   },
//   {
//     "inputs": [],
//     "name": "claim",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ];

const contractAddress = '0x3ebb4A4e91Ad83BE51F8d596533818b246F4bEe1';

const useStyles = makeStyles((theme) => ({
  fontWeight900: {
    fontWeight: 900,
  },
  cardBase: {
    '&:hover': {
      background: theme.palette.primary.main,
      '& .card-icon, & .card-title': {
        color: 'white',
      },
    },
  },
  icon: {
    fontSize: 60,
    color: theme.palette.primary.main,
    [theme.breakpoints.up('sm')]: {
      fontSize: 80,
    },
  },
  title: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(6),
    },
  },
}));

const Token = ({ className, ...rest }) => {
  // const [provider, setProvider] = useState(undefined);
  // const [address, setAddress] = useState('');
  // const [balance, setBalance] = useState('');
  // const [airdropAddress, setAirdropAddress] = useState('0x0BaFDe3aDAd83b679FAE5E9793Cd44ab247c6096');
  // const [tokenContract, setTokenContract] = useState(undefined);
  // const [avaliableTokens, setAvailableTokens] = useState('');
  // const [airdropContract, setAirdropContract] = useState(undefined);
  // const [chainId, setChainId] = useState('Unknown');
  // const [sataBalance, setSataBalance] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  // const [showSuccess, setShowSuccess] = useState(false);
  // const [showMainnetWarning, setShowMainnetWarning] = useState(false);

  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const title = "SATA Token";
  const subtitle = 'Blockchains have laid the foundations. Be a part of the true decentralized future.';

  // React.useEffect(() => {
  //   async function setup() {
  //     const cid = await window.ethereum.request({ method: 'eth_chainId' });
  //     if (cid === '0x1') {
  //       setChainId("Mainnet");
  //     } else {
  //       setChainId("Unknown");
  //     }
  //   }

  //   if (window.ethereum) {
  //     setProvider(new ethers.providers.Web3Provider(window.ethereum));
  //     setup();
  //   }
  // }, []);
  
  // React.useEffect(() => {
  //   if (provider && contractAddress && chainId !== "Unknown") {
  //     setTokenContract(new Contract(contractAddress, tokenAbi, provider));
  //     // setAirdropContract(new Contract(airdropAddress, claimAbi, provider.getSigner()));
  //   }
  // }, [provider, contractAddress, chainId]);

  // React.useEffect(() => {
  //   async function getBal() {
  //     const b = await tokenContract.balanceOf(address);
  //     // const a = await airdropContract.availableTokens();
  //     setSataBalance(ethers.utils.formatEther(b));
  //     // setAvailableTokens(ethers.utils.formatEther(a));
  //   }
  //   if (tokenContract && chainId !== "Unknown") {
  //     getBal();
  //   }
  // }, [tokenContract, chainId]);

  // React.useEffect(() => {
  //   async function getBal() {
  //     const rawBalance = await provider.getBalance(address);
  //     setBalance(ethers.utils.formatEther(rawBalance));
  //   }
  //   if (address && chainId !== "Unknown") {
  //     getBal();
  //   }
  // }, [address, provider, chainId]);

  // const handleClickConnectMetaMask = async (e) => {
  //   e.preventDefault();
  //   setErrorMessage('');
  //   if (window.ethereum) {
  //     try { 
  //       const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  //       if (accounts && accounts.length > 0) {
  //         setAddress(accounts[0])
  //       }
  //     } catch (e) {
  //       console.error(e);
  //       setErrorMessage(e.message);
  //     }
  //   } else {
  //     setErrorMessage("No Ethereum provider found! Please install an Ethereum provider (like MetaMask) and reload this website.");
  //   }
  // };

  // const handleClickClaimAirdrop = async (e) => {
  //   e.preventDefault();
  //   setErrorMessage('');
  //   setShowSuccess(false);

  //   try {
  //     await airdropContract.claim();

  //     setShowSuccess(true);
  //   } catch (e) {
  //     console.error(e);
  //     if (e.message && e.message.includes("Airdrop already claimed")) {
  //       setErrorMessage("Airdrop already claimed!");
  //     } else {
  //       setErrorMessage(e.message);
  //     }
  //   }
  // };

  // const connectButton = (
  //   <Button
  //     size="large"
  //     variant="contained"
  //     color="secondary"
  //     disabled={address ? true : false}
  //     onClick={handleClickConnectMetaMask}
  //   >
  //     Connect to MetaMask
  //   </Button>
  // );

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title={title}
        subtitle={subtitle}
        align="center"
        titleProps={{
          variant: 'h2',
          color: 'textPrimary',
          className: classes.fontWeight900,
        }}
        // ctaGroup={[connectButton]}
      />
      <Grid container justify="space-between" spacing={4}>
        <Grid item xs={12}>
          <Grid container justify="space-between" spacing={isMd ? 4 : 2} direction={isMd ? 'row': 'column-reverse'}>
            <Grid item xs={12} container alignItems="center" data-aos={'fade-right'}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12}>
                  <Typography color="primary" variant="h4" gutterBottom>
                    Contract Address
                  </Typography>
                  <List disablePadding>
                    <ListItem disableGutters data-aos="fade-up">
                      <ListItemAvatar className={classes.listItemAvatar}>
                        <IconAlternate
                          size="small"
                          fontIconClass="fab fa-ethereum"
                          // color={chainId !== "Unknown" && contractAddress ? colors.green : colors.red}
                          color={colors.green}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={contractAddress ? (<code>{contractAddress}</code>) : "No Contract On This Network"}
                        secondary="Token Contract Address"
                      />
                    </ListItem>
                    {/* <ListItem disableGutters data-aos="fade-up">
                      <ListItemAvatar className={classes.listItemAvatar}>
                        <IconAlternate
                          size="small"
                          fontIconClass="fas fa-network-wired"
                          color={chainId !== "Unknown" ? colors.green : colors.red}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={chainId}
                        secondary="Network"
                      />
                    </ListItem> */}
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={isMd ? 4 : 2}>
                    <Grid item xs={12} sm={4} data-aos="fade-up">
                      <CardBase withShadow liftUp className={classes.cardBase}>
                        <div>
                          <NoSsr>
                            <i
                              className={clsx(classes.icon, 'fas fa-exchange-alt', 'card-icon')}
                            />
                          </NoSsr>
                        </div>
                        <Button
                          size="large"
                          className={clsx(classes.title, 'card-title')}
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://app.uniswap.org/#/swap?outputCurrency=0x3ebb4A4e91Ad83BE51F8d596533818b246F4bEe1"
                        >
                          Uniswap V2
                        </Button>
                      </CardBase>
                    </Grid>
                    <Grid item xs={12} sm={4} data-aos="fade-up">
                      <CardBase withShadow liftUp className={classes.cardBase}>
                        <div>
                          <NoSsr><i className={clsx(classes.icon, 'fas fa-info', 'card-icon')} /></NoSsr>
                        </div>
                        <Button
                          size="large"
                          className={clsx(classes.title, 'card-title')}
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://etherscan.io/token/0x3ebb4a4e91ad83be51f8d596533818b246f4bee1"
                        >
                          Etherscan
                        </Button>
                      </CardBase>
                    </Grid>
                    <Grid item xs={12} sm={4} data-aos="fade-up">
                      <CardBase
                        withShadow
                        liftUp
                        className={classes.cardBase}
                      >
                        <div>
                          <NoSsr>
                            <i
                              className={clsx(classes.icon, 'fas fa-chart-line', 'card-icon')}
                            />
                          </NoSsr>
                        </div>
                        <Button
                          size="large"
                          className={clsx(classes.title, 'card-title')}
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.dextools.io/app/uniswap/pair-explorer/0xbc00e708c407d7633f7504434e74c13e171de7f1"
                        >
                          Dextools
                        </Button>
                      </CardBase>
                    </Grid>
                  </Grid>
                </Grid>
                {/* {address && contractAddress && (
                  <>
                    <Grid item xs={12}>
                      <Typography color="primary" variant="h4" gutterBottom>
                        Connected Account Details
                      </Typography>
                      <List disablePadding>
                        <ListItem disableGutters data-aos="fade-up">
                          <ListItemAvatar className={classes.listItemAvatar}>
                            <IconAlternate
                              size="small"
                              fontIconClass="fas fa-at"
                              color={colors.green}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={(<code>{address}</code>)}
                            secondary="Connected Account"
                          />
                        </ListItem>
                        <ListItem disableGutters data-aos="fade-up">
                          <ListItemAvatar className={classes.listItemAvatar}>
                            <IconAlternate
                              size="small"
                              fontIconClass="fab fa-ethereum"
                              color={colors.green}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={(<code>{balance} ETH</code>)}
                            secondary="ETH Balance"
                          />
                        </ListItem>
                        <ListItem disableGutters data-aos="fade-up">
                          <ListItemAvatar className={classes.listItemAvatar}>
                            <IconAlternate
                              size="small"
                              fontIconClass="fas fa-coins"
                              color={colors.green}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={(<code>{sataBalance} SATA</code>)}
                            secondary="SATA Balance"
                          />
                        </ListItem>
                        <ListItem disableGutters data-aos="fade-up">
                          <ListItemAvatar className={classes.listItemAvatar}>
                            <IconAlternate
                              size="small"
                              fontIconClass="fas fa-donate"
                              color={colors.green}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={(<code>{avaliableTokens} SATA</code>)}
                            secondary="Remaining Airdop Tokens Available"
                          />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                      <Grid item xs={12}>
                        <Alert severity="success">
                          Airdrop depleted - follow us on Telegram for future project updates.
                        </Alert>
                      </Grid>
                      <Button
                        type="submit"
                        color="secondary"
                        size="large"
                        variant="contained"
                        disabled={chainId === "Unknown"}
                        onClick={handleClickClaimAirdrop}
                      >
                        Claim Airdrop
                      </Button>
                    </Grid>
                    {showSuccess && (
                      <Grid item xs={12}>
                        <Alert severity="info">
                          Airdrop claim submitted - check your wallet to view the transaction
                          status.
                        </Alert>
                      </Grid>
                    )}
                  </>
                )} */}
                
                {/* {errorMessage && (
                  <Grid item xs={12}>
                    <Alert severity="error">{errorMessage}</Alert>
                  </Grid>
                )} */}
                <Grid item xs={12}>
                  <Typography color="primary" variant="h4" gutterBottom>
                    Tokenomics
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    The SATA token is an Ethereum ERC-20 token, with a fixed supply of 100,000,000 tokens.
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    40,000,000 SATA tokens are reserved by Congruent Labs for development &amp; distribution to the market as needed to support project milestones.
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    10,000,000 tokens are reserved by Congruent Labs for enabling integration with partners, and for allocation to beta service users.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="primary" variant="h4" gutterBottom>
                    Token Locking Schedule
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    Tokens reserved by Congruent Labs are locked for gradual availability for use. The following rules will be
                    in place for the release of tokens to the market:
                  </Typography>
                  <Typography color="primary" variant="h5" gutterBottom>
                    Reserve Tokens
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    Each quarter will unlock 2,500,000 SATA tokens for use by Congruent Labs in marketing, development &amp; additional
                    business activities where required. This supply is expected to be completely unlocked by Q1 2025.
                  </Typography>
                  <Typography color="primary" variant="h5" gutterBottom>
                    Integration Tokens
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    10,000,000 tokens will be locked. In Q3 2021 5,000,000 tokens will be released in conjunction with the release of the
                    proof of concepts. In Q4 2021 the remaining 5,000,000 tokens will be released for further proof of concept releases.  
                  </Typography>
                  <Typography color="primary" variant="h5" gutterBottom>
                    Undistributed Tokens
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    35,000,000 tokens will remain unlocked and will be moved into market liquidity by Q4 2021, in the form of
                    exchange listings, airdrops, and OTC investments.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Image src="token-sched.png" />
                </Grid>
                <Grid item xs={12}>
                  <Typography color="primary" variant="h4" gutterBottom>
                    Uniswap V2 Liquidity Pooling Rewards
                  </Typography>
                  <Typography color="primary" variant="h6" gutterBottom>
                    Disclaimer
                  </Typography>
                  <Typography color="textPrimary" variant="body2" gutterBottom>
                    Providing liquidity on Uniswap V2 is subject to rules defined by Uniswap, not Congruent Labs. All pooled liquidity is
                    managed within Uniswap, not Congruent Labs. Congruent Labs recommend you do your own research in to how liquidity pools
                    work and the concept of <b>impermanent loss</b> (for example, a 5x price change will result in 25.5% loss
                    relative to SATA).
                  </Typography>
                  <Typography color="textPrimary" variant="body2" gutterBottom>
                    Should the entire pool of tokens have a portion unclaimed at the end of the defined period, Congruent Labs reserves the
                    right to continue the incentives longer or withdraw the remainder to utilise for other purposes. Should evidence of attempts
                    to manipulate the pooling rewards are identified by Congruent Labs, Congruent Labs reserves the right to exclude the
                    identified addresses from the program, modify the reward values, or withdraw the program prematurely.
                  </Typography>
                  <Typography color="primary" variant="h5" gutterBottom>
                    Overview
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    To further increase market liquidity, rewards in the form of airdropped tokens will be released for Liquidity
                    Pool providers on Uniswap V2. The airdropped token pool will be capped at 5,000,000 SATA tokens.
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    Tokens will be airdropped to liquidity providers over a total of <b>60</b> days, split into three 20 day stages. Snapshots will be
                    taken at the start and end of each stage and all accounts tracked through the stage. Claims for the airdrop will be based
                    on the lowest position (i.e. the lowest amount of tokens in the pool on each snapshot date) of an address during the stage.
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    Liquidity providers must stake a minimum of 0.5 ETH into the liquidity pool.
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    The <b>maximum</b> number of SATA airdropped to addresses at each stage is 5000 SATA per address. This amount is not
                    guaranteed as rewards will be distributed on a points system. All liquidity providers will be assigned a weighting
                    based on the normal distribution of liquidity share:
                  </Typography>
                  <ul>
                    <Typography color="textPrimary" variant="body1" component="li" gutterBottom>
                      Addresses within 1 standard deviation of the mean will have a weight of 1.
                    </Typography>
                    <Typography color="textPrimary" variant="body1" component="li" gutterBottom>
                      Addresses less than the mean by 1 standard deviation will have a weight of 0.75.
                    </Typography>
                    <Typography color="textPrimary" variant="body1" component="li" gutterBottom>
                      Addresses greater than the mean by 1 standard deviation will have a weight of 1.5.
                    </Typography>
                    <Typography color="textPrimary" variant="body1" component="li" gutterBottom>
                      Addresses greater than the mean by 2 or more standard deviations will have a weight of 2.
                    </Typography>
                    <Typography color="textPrimary" variant="body1" component="li" gutterBottom>
                      Addresses that are less than the mean by 2 or more standard deviations, but meet the minimum 0.5 ETH staking requirement will have a weight of 0.5.
                    </Typography>
                  </ul>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    At the end of each stage rewards will be calculated, and the airdrop contract will be deployed for liquidity providers
                    to claim their reward.
                  </Typography>
                  <Typography color="primary" variant="h5" gutterBottom>
                    Initial Snapshot
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    On the 2021-04-13 13:00:00 UTC a snapshot will be captured of all Liquidity Pool provider addresses.
                  </Typography>
                  <Typography color="primary" variant="h5" gutterBottom>
                    Second Snapshot
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    On the 2021-05-03 13:00:00 UTC a snapshot will be captured again of all Liquidity Pool provider addresses, and
                    a pool of 500,000 SATA tokens will be airdropped to all holders found providing liquidity between the initial
                    snapshot date and the second snapshot date, in accordance with the distribution rules above.
                  </Typography>
                  <Typography color="primary" variant="h5" gutterBottom>
                    Third Snapshot
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    On the 2021-05-23 13:00:00 UTC a snapshot will be captured again of all Liquidity Pool provider addresses, and
                    a pool of 1,500,000 SATA tokens will be airdropped to all holders found providing liquidity between the initial
                    snapshot date and the third snapshot date, in accordance with the distribution rules above.
                  </Typography>
                  <Typography color="primary" variant="h5" gutterBottom>
                    Fourth Snapshot
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    On the 2021-06-12 13:00:00 UTC a snapshot will be captured again of all Liquidity Pool provider addresses, and
                    a pool of 3,000,000 SATA tokens will be airdropped to all holders found providing liquidity between the initial
                    snapshot date and the fourth snapshot date, in accordance with the distribution rules above.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

Token.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Token;
