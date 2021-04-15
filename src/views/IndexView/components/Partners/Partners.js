import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  colors,
  NoSsr,
  Avatar,
  Typography,
} from '@material-ui/core';
import { Image, LearnMoreLink } from 'components/atoms';
import { SectionHeader } from 'components/molecules';
import { CardProduct } from 'components/organisms';

const useStyles = makeStyles(theme => ({
  avatar: {
    width: 100,
    height: 100,
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

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title="Partners"
        subtitleColor="textPrimary"
        data-aos="fade-up"
      />
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} className={classes.gridItem}>
          <CardProduct
            className={classes.cardProduct}
            withShadow
            liftUp
            mediaContent={
              <>
                <Image
                  
                  alt={'title'}
                  lazyProps={{ width: '100%', height: '100%' }}
                  className={classes.image}
                />
                <div className={classes.courseCardPrice}>
                  <Typography
                    variant="body1"
                    color="primary"
                    className={classes.fontWeight700}
                  >
                    {'price'}
                  </Typography>
                </div>
              </>
            }
            cardContent={
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    color="textPrimary"
                    align="left"
                    className={classes.fontWeight700}
                  >
                    {'title'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="left"
                  >
                    {'address'}
                  </Typography>
                </Grid>
                <Grid item container justify="space-between" xs={12}>
                  <Grid
                    item
                    container
                    alignItems="center"
                    justify="flex-end"
                    xs={6}
                  >
                    <NoSsr>
                      <i
                        className={clsx(
                          'fas fa-star',
                          classes.courseCardReviewStar,
                        )}
                      />
                    </NoSsr>
                    <Typography
                      component="span"
                      variant="body1"
                      className={classes.fontWeight700}
                    >
                      {'score'}
                    </Typography>
                    <Typography
                      noWrap
                      component="span"
                      variant="body2"
                      color="textSecondary"
                      className={classes.reviewCount}
                    >
                      ({'reviewCount'} reviews)
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <LearnMoreLink
                    title="Learn more"
                    variant="body1"
                    color="primary"
                  />
                </Grid>
              </Grid>
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

Partners.propTypes = {
  className: PropTypes.string,
};

export default Partners;
