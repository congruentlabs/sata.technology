import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import {
  useMediaQuery,
  Grid,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@material-ui/core';
import { SectionHeader } from 'components/molecules';
import { CardBase } from 'components/organisms';

const useStyles = makeStyles(theme => ({
  cardBase: {
    boxShadow: 'none',
    background: theme.palette.alternate.main,
    borderRadius: theme.spacing(1),
    '& .card-base__content': {
      padding: theme.spacing(1),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3),
      },
    },
  },
  avatar: {
    width: 110,
    height: 110,
    border: `4px solid ${theme.palette.background.paper}`,
    borderRadius: '100%',
    boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.1)',
  },
  listItem: {
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  listItemAvatar: {
    marginRight: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
      marginBottom: theme.spacing(2),
    },
  },
  listItemText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 0,
    height: '100%',
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
  title: {
    fontWeight: 'bold',
  },
}));

const Team = props => {
  const { data, className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const { t } = useTranslation();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title={t('The Project Team')}
        subtitleColor="textPrimary"
        data-aos="fade-up"
      />
      <Grid container spacing={isMd ? 2 : 1}>
        <Grid item xs={6} data-aos="fade-up">
          <CardBase className={classes.cardBase} liftUp>
            <ListItem disableGutters className={classes.listItem}>
              <ListItemAvatar className={classes.listItemAvatar}>
                <Avatar src="tim.jpg" className={classes.avatar} />
              </ListItemAvatar>
              <ListItemText
                className={classes.listItemText}
                primary="Timothy Quinn"
                secondary="Co-Founder / Product Manager"
                primaryTypographyProps={{
                  className: classes.title,
                  variant: 'h6',
                  align: isMd ? 'left' : 'center',
                }}
                secondaryTypographyProps={{
                  color: 'textPrimary',
                  align: isMd ? 'left' : 'center',
                }}
              />
            </ListItem>
          </CardBase>
        </Grid>
        <Grid item xs={6} data-aos="fade-up">
          <CardBase className={classes.cardBase} liftUp>
            <ListItem disableGutters className={classes.listItem}>
              <ListItemAvatar className={classes.listItemAvatar}>
                <Avatar src="ben.jpg" className={classes.avatar} />
              </ListItemAvatar>
              <ListItemText
                className={classes.listItemText}
                primary="Benjamin Burrough"
                secondary="Co-Founder / Technical Lead"
                primaryTypographyProps={{
                  className: classes.title,
                  variant: 'h6',
                  align: isMd ? 'left' : 'center',
                }}
                secondaryTypographyProps={{
                  color: 'textPrimary',
                  align: isMd ? 'left' : 'center',
                }}
              />
            </ListItem>
          </CardBase>
        </Grid>      
      </Grid>
    </div>
  );
};

Team.propTypes = {
  className: PropTypes.string,
};

export default Team;
