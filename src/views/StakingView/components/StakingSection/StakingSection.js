import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Divider,
  Grid,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  LinearProgress,
  ButtonGroup,
  Box,
} from '@material-ui/core';
import { Image } from 'components/atoms';
import { CardProduct } from 'components/organisms';

const useStyles = makeStyles(theme => ({
  cardProduct: {
    display: 'flex',
    height: '100%',
    borderRadius: theme.spacing(1),
    '& .card-product__content, & .card-product__media': {
      flex: '1 1 50%',
      height: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column !important',
      '& .card-product__content, & .card-product__media': {
        flex: '1 1 100%',
      },
    },
  },
  cardProductReverse: {
    flexDirection: 'row-reverse',
    '& .card-product__media img': {
      borderRadius: theme.spacing(0, 0, 0, 20),
    },
  },
  image: {
    objectFit: 'cover',
    borderRadius: theme.spacing(0, 0, 20, 0),
  },
  blogContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  list: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  tag: {
    padding: theme.spacing(1 / 2, 1),
    borderRadius: theme.spacing(1 / 2),
    background: theme.palette.secondary.light,
    color: 'white',
    margin: theme.spacing(0, 1, 1, 0),
    cursor: 'pointer',
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 2, 2, 0),
    },
  },

  gridCard: {
    padding: theme.spacing(2),
    background: theme.palette.alternate.main,
    borderRadius: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4),
    },
    
  },
  gridItem: {
    height: '100%',
  },
  reviewCount: {
    marginLeft: theme.spacing(1),
  },
  imagePartner: {
    objectFit: 'cover',
    maxWidth: '400px',
  },
  fontWeight700: {
    fontWeight: 700,
  },
}));

const StakingSection = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <CardProduct
            withShadow
            liftUp
            className={classes.cardProduct}
            mediaContent={(
              <Image
                src="governance-partner.png"
                className={classes.image}
                lazyProps={{ width: '100%', height: '100%' }}
              />
            )}
            cardContent={(
              <div className={classes.poolContent}>
                <Typography variant="h3" color="textPrimary" className={classes.fontWeight700}>
                  1,000,000 SATA
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  120% APR
                </Typography>
                <Typography variant="h4" color="textSecondary" gutterBottom>
                  180 Days Maturity Period
                </Typography>
                <Typography variant="h5" color="textPrimary">
                  Partner Pool
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                  Exclusive for Project Partners & Affiliates
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={20}
                      style={{ height: 10, borderRadius: 5 }}
                    />
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">20%</Typography>
                  </Box>
                </Box>
                <div style={{ flexGrow: 1 }} />
                <Divider className={classes.divider} />
                <div className={classes.list}>
                  <div className={classes.avatarContainer}>
                    <ButtonGroup
                      size="large"
                      color="secondary"
                    >
                      <Button
                        variant="contained"
                        href="https://stake.unifyre.io/signata/info/0x635315aa539d49b426784af9616e2ef9262ff7ba"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Join the Pool
                      </Button>
                      <Button
                        variant="outlined"
                        href="https://forms.gle/ppLft9dvvziNJevn7"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Request Entry
                      </Button>
                    </ButtonGroup>
                  </div>
                </div>
              </div>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <CardProduct
            withShadow
            liftUp
            className={classes.cardProduct}
            mediaContent={(
              <Image
                src="governance-standard.png"
                className={classes.image}
                lazyProps={{ width: '100%', height: '100%' }}
              />
            )}
            cardContent={(
              <div className={classes.poolContent}>
                <Typography variant="h3" color="textPrimary" className={classes.fontWeight700}>
                  2,000,000 SATA
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  60% APR
                </Typography>
                <Typography variant="h4" color="textSecondary" gutterBottom>
                  180 Days Maturity Period
                </Typography>
                <Typography variant="h5" color="textPrimary">
                  Standard Pool
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                  For Enhanced Governance Rights
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={100}
                      color="secondary"
                      style={{ height: 10, borderRadius: 5 }}
                    />
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">Filled!</Typography>
                  </Box>
                </Box>
                <div style={{ flexGrow: 1 }} />
                <Divider className={classes.divider} />
                <div className={classes.list}>
                  <div className={classes.avatarContainer}>
                    <Button
                      size="large"
                      variant="contained"
                      color="secondary"
                      href="https://stake.unifyre.io/signata/info/0x5dbaa82b59262e585ee7a53121bfad92b60ea0b7"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View the Pool
                    </Button>
                  </div>
                </div>
              </div>
            )}
          />
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Typography
            variant="h6"
            color="textSecondary"
          >
            Powered By
          </Typography>
          <Image
            alt="Ferrum Network Logo"
            className={classes.imagePartner}
            src="ferrum-alt.png"
          />
        </Grid>
      </Grid>
    </div>
  );
};

StakingSection.propTypes = {
  className: PropTypes.string,
};

export default StakingSection;
