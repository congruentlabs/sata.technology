import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
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
                    The Signata token has migrated from Uniswap v2 to v3. Please be aware that until all liquidity providers make the switch to v3 some tracking websites may show incorrect token information. For example, Dextools only shows v2 information at the moment and alternative tools should be used.
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
                        <Button
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://app.uniswap.org/#/swap?outputCurrency=0x3ebb4A4e91Ad83BE51F8d596533818b246F4bEe1"
                        >
                          Uniswap
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
                        <Button
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://tokpie.com/regis/?ref=9o58pSvrTHyIh87o"
                        >
                          Tokpie
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
                      <ButtonGroup orientation="vertical" fullWidth color="secondary" size="large" variant="contained">
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
                        <Button
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://kek.tools/t/0x3ebb4a4e91ad83be51f8d596533818b246f4bee1?pair=0xe72d262158f402faf553179b2b4aff23dfad6d4c"
                        >
                          Kektics
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
                          color={colors.green}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={contractAddress ? (<code>{contractAddress}</code>) : "No Contract On This Network"}
                        secondary="ERC-20 Token Contract Address"
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
