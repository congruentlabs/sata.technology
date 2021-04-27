import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Toolbar,
  Hidden,
  List,
  ListItem,
  Select,
  MenuItem,
} from '@material-ui/core';
import { Image, DarkModeToggler } from 'components/atoms'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  flexGrow: {
    flexGrow: 1,
  },
  navigationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbar: {
    zIndex: 999,
    maxWidth: theme.layout.contentWidth,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 8),
    },
  },
  navLink: {
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  listItem: {
    cursor: 'pointer',
    '&:hover > .menu-item, &:hover svg': {
      color: theme.palette.primary.dark,
    },
    '&.menu-item--no-dropdown': {
      paddingRight: 0,
    },
  },
  listItemActive: {
    '&> .menu-item': {
      color: theme.palette.primary.dark,
    },
  },
  listItemText: {
    flex: '0 0 auto',
    marginRight: theme.spacing(2),
    whiteSpace: 'nowrap',
  },
  listItemButton: {
    whiteSpace: 'nowrap',
  },
  listItemIcon: {
    minWidth: 'auto',
  },
  popover: {
    padding: theme.spacing(4),
    border: theme.spacing(2),
    boxShadow: '0 0.5rem 2rem 2px rgba(116, 123, 144, 0.09)',
    minWidth: 350,
    marginTop: theme.spacing(2),
  },
  iconButton: {
    marginLeft: theme.spacing(2),
    padding: 0,
    '&:hover': {
      background: 'transparent',
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
    color: theme.palette.primary.dark,
  },
  logoContainer: {
    width: 48,
    height: 48,
    [theme.breakpoints.up('md')]: {
      width: 48,
      height: 48,
    },
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  menu: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuItem: {
    marginRight: theme.spacing(5),
    '&:last-child': {
      marginRight: 0,
    },
  },
  menuGroupItem: {
    paddingTop: 0,
  },
  menuGroupTitle: {
    textTransform: 'uppercase',
  },
}));

const Topbar = ({ themeMode, themeToggler, onSidebarOpen, pages, className, ...rest }) => {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(localStorage.getItem('language') || 'en');

  const onChangeLang = (e) => {
    setLang(e.target.value);
    i18n.changeLanguage(e.target.value);
    localStorage.setItem('language', e.target.value);
  }

  useEffect(() => {
    const l = localStorage.getItem('language');
    if (l) {
      i18n.changeLanguage(l);
    }
  }, [i18n]);

  return (
    <Toolbar disableGutters className={classes.toolbar} {...rest}>
      <div className={classes.logoContainer}>
        <a href="/" title="SATA Logo">
          <Image
            className={classes.logoImage}
            src="logo.png"
            alt="SATA Logo"
            lazy={false}
          />
        </a>
      </div>
      <div className={classes.flexGrow} />
      <Hidden smDown>
        <List disablePadding className={classes.navigationContainer}>
          <ListItem className={clsx(classes.listItem, 'menu-item--no-dropdown')}>
            <Select
              value={lang}
              onChange={onChangeLang}
              variant="outlined"
            >
              <MenuItem value='en'>English</MenuItem>
              <MenuItem value='es'>español</MenuItem>
            </Select>
          </ListItem>
          <ListItem className={clsx(classes.listItem, 'menu-item--no-dropdown')}>
            <DarkModeToggler themeMode={themeMode} onClick={() => themeToggler()} />
          </ListItem>
        </List>
      </Hidden>
      <Hidden mdUp>
        <Select
          value={lang}
          onChange={onChangeLang}
          variant="outlined"
        >
          <MenuItem id="english" value='en'>English</MenuItem>
          <MenuItem id="español" value='es'>español</MenuItem>
        </Select>
        <DarkModeToggler themeMode={themeMode} onClick={() => themeToggler()} />
      </Hidden>
    </Toolbar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
  pages: PropTypes.object,
  themeToggler: PropTypes.func.isRequired,
  themeMode: PropTypes.string.isRequired,
};

export default Topbar;
