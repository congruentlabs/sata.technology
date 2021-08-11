import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import { Image, LearnMoreLink } from 'components/atoms';
import { SectionHeader } from 'components/molecules';
import { CardBase } from 'components/organisms';

const useStyles = makeStyles(theme => ({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: theme.spacing(1),
  },
  listItemAvatar: {
    marginRight: theme.spacing(3),
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
  cardProduct: {
    borderRadius: theme.spacing(3),
  },
  courseCardPrice: {
    padding: theme.spacing(1),
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    background: theme.palette.background.paper,
    borderRadius: theme.spacing(1),
  },
  courseCardReviewAvatar: {
    marginLeft: theme.spacing(-2),
    border: `3px solid ${theme.palette.background.paper}`,
    '&:first-child': {
      marginLeft: 0,
    },
  },
  courseCardReviewStar: {
    // color: colors.yellow[800],
    marginRight: theme.spacing(1 / 2),
  },
  reviewCount: {
    marginLeft: theme.spacing(1),
  },
  image: {
    objectFit: 'cover',
  },
  fontWeight700: {
    fontWeight: 700,
  },
}));

const Partners = props => {
  const { data, className, ...rest } = props;
  const classes = useStyles();

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title="Partnerships/Integrations"
        subtitleColor="textPrimary"
        data-aos="fade-up"
      />
      <Grid container spacing={4} justify="center">
        <Grid item xs={12} md={6} className={classes.gridItem}>
          <CardBase className={classes.cardBase}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Image
                  src="chainlink.png"
                  alt="Chainlink Logo"
                  className={classes.image}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  color="textSecondary"
                  align="left"
                >
                  Integration
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'left' }}>
                <LearnMoreLink
                  title="Learn more"
                  href="https://blog.congruentlabs.co/signata-will-leverage-chainlink-oracles-to-power-its-on-chain-identity-management-system/"
                  variant="h5"
                  color="primary"
                />
              </Grid>
            </Grid>
          </CardBase>
        </Grid>
        <Grid item xs={12} md={6} className={classes.gridItem}>
          <CardBase className={classes.cardBase}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Image
                  src="TODO.png"
                  alt="TODO Logo"
                  className={classes.image}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  color="textSecondary"
                  align="left"
                >
                  Partner
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'left' }}>
                <LearnMoreLink
                  title="Learn more"
                  href="https://blog.congruentlabs.co/ TODO"
                  variant="h5"
                  color="primary"
                />
              </Grid>
            </Grid>
          </CardBase>
        </Grid>
      </Grid>
    </div>
  );
};

Partners.propTypes = {
  className: PropTypes.string,
};

export default Partners;
