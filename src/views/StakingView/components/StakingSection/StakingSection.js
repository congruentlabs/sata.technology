import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
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

const StakingSection = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <Grid container spacing={4} justify="center">
        <Grid item xs={12}>
          <Grid container justify="space-between" spacing={isMd ? 4 : 2} direction={isMd ? 'row': 'column-reverse'}>
            <Grid item xs={12} container alignItems="center" data-aos={'fade-right'}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12}>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    Inject Content Here
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

StakingSection.propTypes = {
  className: PropTypes.string,
};

export default StakingSection;
