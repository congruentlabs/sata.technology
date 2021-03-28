import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { SectionHeader } from 'components/molecules';

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
}));

const Team = props => {
  const { data, className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title="The Project Team"
        subtitleColor="textPrimary"
        data-aos="fade-up"
      />
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} className={classes.gridItem}>
          <Grid
            container
            className={classes.gridCard}
            data-aos="fade-up"
            spacing={2}
          >
            <Grid
              item
              container
              justify={isMd ? 'flex-start' : 'center'}
              alignItems="center"
              xs={12}
            >
              <List disablePadding>
                <ListItem disableGutters>
                  <ListItemAvatar className={classes.listItemAvatar}>
                    <Avatar
                      alt="Product Manager"
                      className={classes.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Timothy Quinn"
                    secondary="Co-Founder/Product Manager"
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} className={classes.gridItem}>
          <Grid
            container
            className={classes.gridCard}
            data-aos="fade-up"
            spacing={2}
          >
            <Grid
              item
              container
              justify={isMd ? 'flex-start' : 'center'}
              alignItems="center"
              xs={12}
            >
              <List disablePadding>
                <ListItem disableGutters>
                  <ListItemAvatar className={classes.listItemAvatar}>
                    <Avatar
                      alt="Technical Lead"
                      className={classes.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Ben Burrough"
                    secondary="Co-Founder/Technical Lead"
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

Team.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * Data to be rendered
   */
  data: PropTypes.array.isRequired,
};

export default Team;
