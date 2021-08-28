import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Grid,
  List,
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
    background: "#002A44",
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
                {[
                  {
                    href: t('telegram url'),
                    alt: "SATA Telegram",
                    fontIconClass: "fab fa-telegram",
                  },
                  {
                    href: "https://discord.gg/pEJu4ZjnfX",
                    alt: "SATA Discord",
                    fontIconClass: "fab fa-discord",
                  },
                  {
                    href: "https://twitter.com/satatoken",
                    alt: "SATA Twitter",
                    fontIconClass: "fab fa-twitter",
                  },
                  {
                    href: "https://github.com/congruentlabs",
                    alt: "Congruent Labs Github",
                    fontIconClass: "fab fa-github",
                  },
                  {
                    href: "https://blog.congruentlabs.co/",
                    alt: "Congruence Blog",
                    fontIconClass: "fas fa-rss",
                  },
                  {
                    href: "https://www.linkedin.com/company/congruent-labs-pty-ltd/",
                    alt: "Congruent Labs LinkedIn",
                    fontIconClass: "fab fa-linkedin",
                  },
                  {
                    href: "https://congruentlabs.co/",
                    alt: "Congruent Labs Website",
                    fontIconClass: "fas fa-building",
                  },
                ].map((listItem) => (
                  <IconButton
                    key={listItem.href}
                    href={listItem.href}
                    target="_blank"
                    alt={listItem.alt}
                    color="secondary"
                  > 
                    <Icon size="small" fontIconClass={listItem.fontIconClass} />
                  </IconButton>
                ))}
              </ListItem>
            </List>
          </Grid>
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
