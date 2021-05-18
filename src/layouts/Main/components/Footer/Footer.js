import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Grid,
  List,
  colors,
  ListItem,
} from '@material-ui/core';
import { Icon } from 'components/atoms';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(6, 0),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(12, 0),
    },
    background: theme.palette.background.footer,
  },
  footerContainer: {
    maxWidth: theme.layout.contentWidth,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 8),
    },
  },
  logoContainerItem: {
    paddingTop: 0,
  },
  logoContainer: {
    width: 120,
    height: 32,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  groupTitle: {
    textTransform: 'uppercase',
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing(1),
  },
  socialIcon: {
    padding: 0,
    marginRight: theme.spacing(1),
    color: 'rgba(255,255,255,.6)',
    '&:hover': {
      background: 'transparent',
    },
    '&:last-child': {
      marginRight: 0,
    },
  },
  icon: {
    fontSize: 24,
  },
  menuListContainer: {
    padding: '0 !important',
  },
  menu: {
    display: 'flex',
  },
  menuItem: {
    margin: theme.spacing(2),
    '&:last-child': {
      marginBottom: 0,
    },
  },
  menuGroupItem: {
    paddingTop: 0,
    paddingBottom: theme.spacing(1 / 2),
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  menuGroupTitle: {
    textTransform: 'uppercase',
    color: 'white',
  },
  divider: {
    width: '100%',
  },
  navLink: {
    color: 'rgba(255,255,255,.6)',
  },
}));

const Footer = props => {
  const { className, ...rest } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.footerContainer}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <List disablePadding>
              <ListItem disableGutters className={classes.navLink}>
                &copy; {new Date().getFullYear()} Congruent Labs Pty Ltd
              </ListItem>
              <ListItem disableGutters>
                <IconButton
                  href={t('telegram url')}
                  target="_blank"
                  alt="SATA Telegram"
                  color="primary"
                > 
                  <Icon size="small" fontIconClass="fab fa-telegram" color={colors.blue} />
                </IconButton>
                <IconButton
                  href="https://discord.gg/pEJu4ZjnfX"
                  target="_blank"
                  alt="SATA Discord"
                  color="primary"
                > 
                  <Icon size="small" fontIconClass="fab fa-discord" color={colors.blue} />
                </IconButton>
                <IconButton
                  href="https://twitter.com/satatoken"
                  target="_blank"
                  alt="SATA Twitter"
                  color="primary"
                > 
                  <Icon size="small" fontIconClass="fab fa-twitter" color={colors.blue} />
                </IconButton>
                <IconButton
                  href="https://github.com/congruentlabs"
                  target="_blank"
                  alt="Congruent Labs Github"
                  color="primary"
                > 
                  <Icon size="small" fontIconClass="fab fa-github" color={colors.blue} />
                </IconButton>
                <IconButton
                  href="https://blog.congruentlabs.co/"
                  target="_blank"
                  alt="Company Blog"
                  color="primary"
                > 
                  <Icon size="small" fontIconClass="fas fa-rss" color={colors.blue} />
                </IconButton>
                <IconButton
                  href="https://www.linkedin.com/company/congruent-labs-pty-ltd/"
                  target="_blank"
                  alt="Company LinkedIn"
                  color="primary"
                > 
                  <Icon size="small" fontIconClass="fab fa-linkedin" color={colors.blue} />
                </IconButton>
              </ListItem>
            </List>
          </Grid>
          {/* <Grid item xs={12} md={10} className={classes.menuListContainer}>
            <Grid container spacing={0}>
            </Grid>
          </Grid> */}
        </Grid>
      </div>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.object,
};

export default Footer;
