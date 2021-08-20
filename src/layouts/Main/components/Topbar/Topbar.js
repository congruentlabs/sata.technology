import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Toolbar,
  Button,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Popover,
  MenuItem,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
    width: 'auto',
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
    padding: theme.spacing(1),
    border: theme.spacing(1),
    boxShadow: '0 0.5rem 2rem 2px rgba(116, 123, 144, 0.09)',
    minWidth: 150,
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
  const [renderLang, setRenderLang] = useState(localStorage.getItem('renderLanguage') || 'English');
  const [anchorEl, setAnchorEl] = useState(null);
  const [openedPopoverId, setOpenedPopoverId] = useState(null);

  const onChangeLang = (e, clickedLang, clickedRenderLang) => {
    setRenderLang(clickedRenderLang);
    i18n.changeLanguage(clickedLang);
    localStorage.setItem('language', clickedLang);
    localStorage.setItem('renderLanguage', clickedRenderLang);
    setAnchorEl(null);
    setOpenedPopoverId(null);
  }

  useEffect(() => {
    const l = localStorage.getItem('language');
    if (l) {
      i18n.changeLanguage(l);
    }
  }, [i18n]);

  const handleClick = (event, popoverId) => {
    setAnchorEl(event.target);
    setOpenedPopoverId(popoverId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenedPopoverId(null);
  };

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
          {/* <ListItem className={clsx(classes.listItem, 'menu-item--no-dropdown')}>
            <Button
              className={classes.listItemText}
              component="a"
              href="/demo"
              variant="contained"
              color="primary"
              disabled
            >
              DEMO (Coming Soon!)
            </Button>
          </ListItem> */}
          <ListItem className={clsx(classes.listItem, 'menu-item--no-dropdown')}>
            <Button
              className={classes.listItemText}
              component="a"
              href="/staking"
              variant="contained"
              color="primary"
            >
              Staking
            </Button>
          </ListItem>

          <ListItem
            aria-describedby="lang"
            onClick={e => handleClick(e, "lang")}
            className={clsx(
              classes.listItem,
              openedPopoverId === "lang" ? classes.listItemActive : '',
            )}
          >
            <Typography
              variant="body1"
              color="textPrimary"
              className={clsx(classes.listItemText, 'menu-item')}
            >
              {renderLang}
            </Typography>
            <ListItemIcon className={classes.listItemIcon}>
              <ExpandMoreIcon
                className={
                  openedPopoverId === "lang" ? classes.expandOpen : ''
                }
                fontSize="small"
              />
            </ListItemIcon>
          </ListItem>
          <Popover
            elevation={1}
            id="lang"
            open={openedPopoverId === "lang"}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            classes={{ paper: classes.popover }}
          >
            <div className={classes.menuItem}>
              <MenuItem value='en' onClick={e => onChangeLang(e, "en", "English")}>English</MenuItem>
              <MenuItem value='es' onClick={e => onChangeLang(e, "es", "español")}>español</MenuItem>
            </div>
          </Popover>
          <ListItem className={clsx(classes.listItem, 'menu-item--no-dropdown')}>
            <DarkModeToggler themeMode={themeMode} onClick={() => themeToggler()} />
          </ListItem>
        </List>
      </Hidden>
      <Hidden mdUp>
        {/* <Button
          className={classes.listItemText}
          component="a"
          href="/demo"
          variant="outlined"
        >
          DEMO
        </Button> */}
        <ListItem
          aria-describedby="lang"
          onClick={e => handleClick(e, "lang")}
          className={clsx(
            classes.listItem,
            openedPopoverId === "lang" ? classes.listItemActive : '',
          )}
        >
          <Typography
            variant="body1"
            color="textPrimary"
            className={clsx(classes.listItemText, 'menu-item')}
          >
            {renderLang}
          </Typography>
          <ListItemIcon className={classes.listItemIcon}>
            <ExpandMoreIcon
              className={
                openedPopoverId === "lang" ? classes.expandOpen : ''
              }
              fontSize="small"
            />
          </ListItemIcon>
        </ListItem>
        <Popover
          elevation={1}
          id="lang"
          open={openedPopoverId === "lang"}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          classes={{ paper: classes.popover }}
        >
          <div className={classes.menuItem}>
            <MenuItem value='en' onClick={e => onChangeLang(e, "en", "English")}>English</MenuItem>
            <MenuItem value='es' onClick={e => onChangeLang(e, "es", "español")}>español</MenuItem>
          </div>
        </Popover>
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
