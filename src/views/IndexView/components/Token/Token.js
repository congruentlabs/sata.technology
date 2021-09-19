import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  ButtonGroup,
  colors,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { SectionHeader, IconAlternate } from 'components/molecules';
import { DescriptionListIcon } from 'components/organisms';
import { Image } from 'components/atoms';
import { useTranslation } from 'react-i18next';

const erc20ContractAddress = '0x3ebb4A4e91Ad83BE51F8d596533818b246F4bEe1';
const bep20ContractAddress = 'Coming Soon!';

const useStyles = makeStyles((theme) => ({
  fontWeight900: { fontWeight: 900 },
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
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const title = t('SATA Token');
  const subtitle = t('Blockchains have laid the foundations. Be a part of the true decentralized future.');

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
                <Grid item xs={12}>
                  <Alert severity="warning">
                    The Signata token has migrated from Uniswap v2 to v3. Please be aware that until all liquidity providers make the switch to v3 some tracking websites may show incorrect token information.
                  </Alert>
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
                      <ButtonGroup orientation="vertical" fullWidth color="secondary" size="large" variant="contained">
                        {[
                          { title: "TimeX", href: "https://timex.io/?refcode=Adyz2tRxBuMyvuh0" },
                          { title: "Uniswap", href: "https://app.uniswap.org/#/swap?outputCurrency=0x3ebb4A4e91Ad83BE51F8d596533818b246F4bEe1" },
                          { title: "Coinsbit", href: "https://coinsbit.io/referral/1be5f6ca-f462-4e0f-ac5d-a4a7ab00c80e" },
                          { title: "P2PB2B", href: "https://p2pb2b.io?referral=d8b84618" },
                        ].map((i) => (
                          <Button
                            key={i.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            href={i.href}
                          >
                            {i.title}
                          </Button>
                        ))}
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
                    title="Token Trackers"
                    align="center"
                    className={classes.descriptionListIcon}
                    data-aos="fade-up"
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={12} data-aos="fade-up">
                      <ButtonGroup orientation="vertical" fullWidth color="secondary" size="large" variant="contained">
                        {[
                          { title: "Etherscan", href: "https://etherscan.io/token/0x3ebb4a4e91ad83be51f8d596533818b246f4bee1" },
                          { title: "CoinMarketCap", href: "https://coinmarketcap.com/currencies/signata/" },
                          { title: "CoinGecko", href: "https://www.coingecko.com/en/coins/signata" },
                          { title: "Kektics", href: "https://kek.tools/t/0x3ebb4a4e91ad83be51f8d596533818b246f4bee1?pair=0xbc00e708c407d7633f7504434e74c13e171de7f1" },
                        ].map((i) => (
                          <Button
                            key={i.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            href={i.href}
                          >
                            {i.title}
                          </Button>
                        ))}
                      </ButtonGroup>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <List disablePadding>
                    <ListItem disableGutters data-aos="fade-up">
                      <ListItemAvatar>
                        <Avatar src="/logo-eth.png" alt="Ethereum Logo" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={(<code>{erc20ContractAddress}</code>)}
                        secondary="ERC-20 Token Contract Address"
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <List disablePadding>
                    <ListItem disableGutters data-aos="fade-up">
                      <ListItemAvatar>
                        <Avatar src="/logo-bsc.png" alt="Ethereum Logo" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={bep20ContractAddress}
                        secondary="BEP-20 Token Contract Address"
                      />
                    </ListItem>
                  </List>
                </Grid>
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
                    The SATA Token is a service token used for the payment of access and authorization between individuals and service providers, and between back-end service providers. Service providers can define prices in SATA for the issuance of rights, and those rights can be purchased by users, getting rid of complex payment services and the associated fees.
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    The Signata framework revolves around the issuance of NFTs (Non-Fungible Tokens) to issue unique and manageable rights on the blockchain. Service providers can do away with complex identity management for their users, and instead simply interrogate the blockchain to allow users to access their systems.
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
                    {t('Undistributed Tokens')}
                  </Typography>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    {t('35,000,000 tokens will remain unlocked and are intented to be moved')}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Alert severity="warning">
                    As the token is bridged to alternative chains, some changes to the token supply may be required. These changes will be proposed to the community for vote once governance services have been completed and audited.
                  </Alert>
                </Grid>
                <Grid item xs={12}>
                  <Image src="token-sched.png" />
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
