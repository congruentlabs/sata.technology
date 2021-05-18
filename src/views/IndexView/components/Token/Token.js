import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
import {
  // Button,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  colors,
  ListItemText,
  useMediaQuery,
  useTheme,
  Button,
  ButtonGroup,
  // NoSsr,
} from '@material-ui/core';
import { SectionHeader, IconAlternate } from 'components/molecules';
import { DescriptionListIcon } from 'components/organisms';
import { Image } from 'components/atoms';
import { useTranslation } from 'react-i18next';
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
  descriptionListIcon: {
    marginBottom: theme.spacing(2),
  },
  marginTop: {
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(5),
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
  const { t, i18n } = useTranslation();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const title = t('SATA Token');
  const subtitle = t('Blockchains have laid the foundations. Be a part of the true decentralized future.');

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
                    Token Information
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <DescriptionListIcon
                    icon={
                      <IconAlternate
                        fontIconClass={'fas fa-exchange-alt'}
                        size="medium"
                        color={colors.green}
                        shape="circle"
                      />
                    }
                    title="Exchange Listings"
                    align="center"
                    className={classes.descriptionListIcon}
                    data-aos="fade-up"
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={12} data-aos="fade-up">
                      <ButtonGroup orientation="vertical" fullWidth color="secondary" size="large" variant="outlined">
                        <Button
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://app.uniswap.org/#/swap?outputCurrency=0x3ebb4A4e91Ad83BE51F8d596533818b246F4bEe1"
                        >
                          Uniswap v2
                        </Button>
                        <Button
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://coinsbit.io/referral/1be5f6ca-f462-4e0f-ac5d-a4a7ab00c80e"
                        >
                          Coinsbit
                        </Button>
                        <Button
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://p2pb2b.io?referral=d8b84618"
                        >
                          P2PB2B
                        </Button>
                      </ButtonGroup>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <DescriptionListIcon
                    icon={
                      <IconAlternate
                        fontIconClass="fas fa-info"
                        size="medium"
                        color={colors.green}
                        shape="circle"
                      />
                    }
                    title="Token Information"
                    align="center"
                    className={classes.descriptionListIcon}
                    data-aos="fade-up"
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={12} data-aos="fade-up">
                      <ButtonGroup orientation="vertical" fullWidth color="secondary" size="large" variant="outlined">
                        <Button
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://etherscan.io/token/0x3ebb4a4e91ad83be51f8d596533818b246f4bee1"
                        >
                          Etherscan
                        </Button>
                        <Button
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://coinmarketcap.com/currencies/signata/"
                        >
                          CoinMarketCap
                        </Button>
                        <Button
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.coingecko.com/en/coins/signata"
                        >
                          CoinGecko
                        </Button>
                      </ButtonGroup>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
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
                        secondary="SATA Token Contract Address"
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
                    {t('Tokenomics')}
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    {t('The SATA token is an Ethereum ERC-20 token, with a fixed supply of 100,000,000 tokens.')}
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    {t('40,000,000 SATA tokens are reserved by Congruent Labs for development & distribution to the market as needed to support project milestones.')}
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    {t('10,000,000 tokens are reserved by Congruent Labs for enabling integration with partners, and for allocation to beta service users.')}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="primary" variant="h4" gutterBottom>
                    {t('Token Locking Schedule')}
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    {t('Tokens reserved by Congruent Labs are locked for gradual availability for use.')}
                  </Typography>
                  <Typography color="primary" variant="h5" gutterBottom>
                    {t('Reserve Tokens')}
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    {t('Each quarter will unlock 2,500,000 SATA tokens for use by Congruent Labs in marketing, development & additional')}
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    {t('If Congruent Labs determines that the unlocked tokens are not yet required they will re-locked again for reassessment')}
                  </Typography>
                  <Typography color="primary" variant="h5" gutterBottom>
                    {t('Integration Tokens')}
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    {t('10,000,000 tokens will be locked. In Q3 2021 5,000,000 tokens will be released in conjunction with the release of the')}
                  </Typography>
                  <Typography color="primary" variant="h5" gutterBottom>
                    {t('Undistributed Tokens')}
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    {t('35,000,000 tokens will remain unlocked and are intented to be moved')}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Image src="token-sched.png" />
                </Grid>
                {i18n.language === "en" && (
                  <Grid item xs={12}>
                    <Typography color="primary" variant="h4" gutterBottom>
                      Uniswap V2 Liquidity Pooling Rewards
                    </Typography>
                    <ButtonGroup orientation="vertical" fullWidth color="primary" size="large" variant="contained">
                      <Button
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://docs.google.com/document/d/1UqKJxDtK4JdY3SrLSo-dUSBOxhR9YEUqvkFaTlrJZag/edit?usp=sharing"
                      >
                        Information/FAQ for Liquidity Providers
                      </Button>
                    </ButtonGroup>
                  </Grid>
                )}
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
