import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { grey } from '@material-ui/core/colors';
import Web3 from 'web3';

import theme from './theme';

let web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
}

const App = () => {
  const [account, setAccount] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [balance, setBalance] = React.useState('0');
  const [connected, setConnected] = React.useState(false);

  let paletteType = 'light';

  // set the palette first by media query
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  if (prefersDarkMode) { paletteType = 'dark'; }

  // then set it by override, if it has been defined
  const overridePallete = localStorage.getItem('overridePallete');
  if (overridePallete === 'dark') {
    paletteType = 'dark';
  } else if (overridePallete === 'light') {
    paletteType = 'light';
  }

  const modifiedTheme = theme(paletteType);

  // override the background color to have better component contrast
  const bgColor = paletteType === 'dark' ? grey[900] : grey[300];
  
  React.useEffect(() => {
    if (account && web3.eth.accounts && web3.eth.accounts[0]) {
      web3.eth.getBalance(web3.eth.accounts[0], (err, bal) => {
        setAddress(web3.eth.accounts[0]);
        setBalance(web3.fromWei(bal));
      });
    }
  }, [account]);

  React.useEffect(() => {
    if (web3) {
      web3.eth.getAccounts((err, accounts) => {
        setAccount(accounts);
        console.log(accounts);
      });
    }
  }, [web3])

  React.useEffect(() => {
    if (window.ethereum) {
      setConnected(true);
    }
  }, []);

  const icoAddress = '0xCa7532c24aA2B2C1389AC8B1B6018e0eE0c8e9c4';
  const tokenName = 'Signata';
  const tokenSymbol = 'SATA';

  return (
    <div className="App">
      <CssBaseline />
      <ThemeProvider theme={modifiedTheme}>
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Typography variant="h3" component="h1" gutterBottom>
                {tokenName} Token ({tokenSymbol})
              </Typography>
              <Typography variant="h4" component="h2" gutterBottom>
                <a target="_blank" rel="noreferrer" href="https://docs.google.com/document/d/e/2PACX-1vQQPNRkAQYAc5Q1BP5YKbZegpketVWo3T-g8RUPe8BY1x9JPFcUhDIUrMDeMZjZpBiFljynpjkKiHIg/pub">Read the Whitepaper</a>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid> 
            <Grid item xs={6}>
              <Typography variant="h4" component="h2" gutterBottom>
                The Future of Identity
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                Our personal information is collected by every online service we
                interact with, and our information is usually bundled up and sold
                for marketing and advertising purposes, chipping away at the security
                of our personal identities and edging us closer to an Orwellian future.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" component="p" gutterBottom>
                Some Governments try to combat this with legislation, and privacy-focused
                products try to limit what information is shared to 3rd parties, but
                it still hasn't stymied the flow of continued collection, sale, and
                distribution of our online interactions.
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                And for service providers, the legislative, administrative, and financial
                burden added from collecting personal information and payment details
                ensures that the construction and release of systems takes longer, requires
                more engineering effort, and is exposed to more vectors of attack.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4" component="h2" gutterBottom>
                The Identity Guard & Anonymity Framework
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                Congruent Labs is developing the Identity Guard & Anonymity Framework
                (IdGAF), in conjunction with the SATA token, as a means to wrestle back
                control of our identities from big tech.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" component="p" gutterBottom>
                The IdGAF is a jurisdiction-free and privacy-preserving solution to
                online identities, leveraging existing identity management systems and
                bleeding-edge blockchain smart contract technology to provide
                decentralization.
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                IdGAF will provide a zero-trust payment, authentication, and
                authorization solution to allow online platforms to greatly reduce
                the cost of compliance and payment management. These systems will
                operate as a common standard, and implemented through a series of
                smart contracts and public off-chain systems.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid> 
            <Grid item xs={12}>
              <Typography variant="h4" component="h2" gutterBottom>
                Initial Coin Offering
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                The SATA token will be released as an Ethereum ERC-20 token, with a
                fixed supply of 100,000,000 SATA tokens.
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                40,000,000 SATA will be reserved by Congruent Labs for distribution
                to the market as needed to support project milestones. The remainder
                of the tokens will be available for purchase via this ICO.
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                Signata may expand into alternative smart contract capable chains if
                required. In the event of an expansion into an alternative chain, airdrops
                of tokens will be distributed to current SATA holders to distribute
                tokens as closely to the Ethereum-based network as possible.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid> 
            <Grid item xs={12}>
              <Typography variant="h5" component="h3" gutterBottom>
                Your Account Details
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                Connected to MetaMask: {connected ? 'Yes' : 'No'}
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                Your Address: {address}
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                Your ETH Balance: {balance} ETH
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                Your Address:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid> 
            <Grid item xs={12}>
              <Typography variant="h5" component="h3" gutterBottom>
                Investing
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Typography variant="body2" component="p" gutterBottom>
                &copy; {new Date().getFullYear()} Congruent Labs Pty Ltd
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default App;
