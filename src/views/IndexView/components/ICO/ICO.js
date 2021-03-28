import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
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
} from '@material-ui/core';
import { Alert } from "@material-ui/lab";
import { SectionHeader, IconAlternate } from 'components/molecules';
import { ethers, Contract } from 'ethers';

if (window.ethereum) {
  window.ethereum.on('chainChanged', () => {
    window.location.reload();
  });
}

const tokenAbi = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  }
];

const claimAbi = [
  {
    "inputs": [],
    "name": "availableTokens",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "claim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const useStyles = makeStyles(() => ({
  fontWeight900: {
    fontWeight: 900,
  },
}));

const ICO = ({ className, ...rest }) => {
  const [provider, setProvider] = useState(undefined);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [airdropAddress, setAirdropAddress] = useState('');
  const [tokenContract, setTokenContract] = useState(undefined);
  const [avaliableTokens, setAvailableTokens] = useState('');
  const [airdropContract, setAirdropContract] = useState(undefined);
  const [chainId, setChainId] = useState('Unknown');
  const [sataBalance, setSataBalance] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showMainnetWarning, setShowMainnetWarning] = useState(false);

  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const title = "SATA Token Airdrop";
  const subtitle = 'Blockchains have laid the foundations. Be a part of the true decentralized future.';

  React.useEffect(() => {
    async function setup() {
      const cid = await window.ethereum.request({ method: 'eth_chainId' });
      if (cid === '0x3') {
        setChainId("Ropsten");
        setContractAddress("0xB74b3235Aefb677E0d227f206acdE41810166729");
        setAirdropAddress("0xA3B3704e7660335A572E55d503dD7D7ED327dF7E");
      } else if (cid === '0x1') {
        setChainId("Mainnet");
        setShowMainnetWarning(true);
      } else {
        setChainId("Unknown");
      }
    }

    if (window.ethereum) {
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
      setup();
    }
  }, []);
  
  React.useEffect(() => {
    if (provider && contractAddress && airdropAddress && chainId !== "Unknown") {
      setTokenContract(new Contract(contractAddress, tokenAbi, provider));
      setAirdropContract(new Contract(airdropAddress, claimAbi, provider.getSigner()));
    }
  }, [provider, contractAddress, airdropAddress, chainId]);

  React.useEffect(() => {
    async function getBal() {
      const b = await tokenContract.balanceOf(address);
      const a = await airdropContract.availableTokens();
      setSataBalance(ethers.utils.formatEther(b));
      setAvailableTokens(ethers.utils.formatEther(a));
    }
    if (tokenContract && address && chainId !== "Unknown") {
      getBal();
    }
  }, [tokenContract, address, airdropContract, chainId]);

  React.useEffect(() => {
    async function getBal() {
      const rawBalance = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(rawBalance));
    }
    if (address && chainId !== "Unknown") {
      getBal();
    }
  }, [address, provider, chainId]);

  const handleClickConnectMetaMask = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (window.ethereum) {
      try { 
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
          setAddress(accounts[0])
        }
      } catch (e) {
        console.error(e);
        setErrorMessage(e.message);
      }
    } else {
      setErrorMessage("No Ethereum provider found! Please install an Ethereum provider (like MetaMask) and reload this website.");
    }
  };

  const handleClickClaimAirdrop = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setShowSuccess(false);

    try {
      await airdropContract.claim();

      setShowSuccess(true);
    } catch (e) {
      console.error(e);
      if (e.message && e.message.includes("Airdrop already claimed")) {
        setErrorMessage("Airdrop already claimed!");
      } else {
        setErrorMessage(e.message);
      }
    }
  };

  const connectButton = (
    <Button
      size="large"
      variant="contained"
      color="secondary"
      disabled={address ? true : false}
      onClick={handleClickConnectMetaMask}
    >
      Connect to MetaMask
    </Button>
  );

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
        ctaGroup={[connectButton]}
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
                          fontIconClass="fas fa-at"
                          color={chainId !== "Unknown" && contractAddress ? colors.green : colors.red}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={contractAddress ? (<code>{contractAddress}</code>) : "No Contract On This Network"}
                        secondary="Token Contract Address"
                      />
                    </ListItem>
                    <ListItem disableGutters data-aos="fade-up">
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
                    </ListItem>
                  </List>
                </Grid>
                {address && contractAddress && (
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
                )}
                
                {errorMessage && (
                  <Grid item xs={12}>
                    <Alert severity="error">{errorMessage}</Alert>
                  </Grid>
                )}
                {showMainnetWarning && (
                  <Grid item xs={12}>
                    <Alert severity="warning">
                      Mainnet not yet available - follow our Telegram group to be notified when the Airdrop launches.
                    </Alert>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Typography color="primary" variant="h4" gutterBottom>
                    Token Airdrop Terms
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    The SATA token will be released as an Ethereum ERC-20 token, with
                    a fixed supply of 100,000,000 tokens.
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    40,000,000 SATA tokens will be reserved by Congruent Labs for development
                    &amp; distribution to the market as needed to support project milestones.
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    10,000,000 tokens will be reserved by Congruent Labs for
                    enabling integration with partners, and for allocation to beta service users.
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    10,000,000 tokens will be airdropped to any ETH account holding
                    at least 0.1 ETH, with each account receiving 1,000 SATA tokens
                    until the supply is depleted.
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    The remaining 40,000,000 tokens will be supplied as liquidity to exchanges.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="primary" variant="h5" gutterBottom>
                    Airdrop Schedule
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    The Airdrop will announced soon - check this site again for more
                    details, or join our Telegram group for notifications of announcements.
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

ICO.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default ICO;
