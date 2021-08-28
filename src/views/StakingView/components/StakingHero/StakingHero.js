import React from 'react';
import PropTypes from 'prop-types';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Typography,
  // colors,
} from '@material-ui/core';
// import { Icon } from 'components/atoms';
import { SectionHeader } from 'components/molecules';
// import { HeroShaped } from 'components/organisms';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  fontWeight900: {
    fontWeight: 900,
  },
  leftSideContent: {
    '& .section-header__cta-container': {
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        '& .section-header__cta-item-wrapper': {
          width: '100%',
          '&:last-child': {
            marginLeft: 0,
            marginTop: theme.spacing(1),
          },
          '& .MuiButtonBase-root': {
            width: '100%',
          },
        },
      },
    }
  },
  heroShaped: {
    '& .hero-shaped__image': {
      backgroundColor: theme.palette.alternate.main,
    },
    [theme.breakpoints.down('sm')]: {
      '& .hero-shaped__image': {
        position: 'relative',
      },
      '& .hero-shaped__wrapper': {
        flexDirection: 'column',
      },
    },
  },
  imageAnimation: {
    background: `url("backdrop.png")`,
    backgroundRepeat: 'repeat',
    backgroundAttachment: 'scroll',
    backgroundSize: '400px auto',
    animation: `$slideshow 50s linear infinite`,
    width: '600%',
    height: '600%',
    backgroundColor: theme.palette.alternate.dark,
    top: '-25%',
    left: '-100%',
    position: 'absolute',
    [theme.breakpoints.up('sm')]: {
      backgroundSize: '800px auto',
    }
  },
  imageAnimationDark: {
    background: `url("backdrop.png")`,
  },
  '@keyframes slideshow': {
    '0%': {
      transform: 'rotate(-13deg) translateY(-25%)',
    },
    '100%': {
      transform: 'rotate(-13deg) translateY(-80%)',
    },
  },
}));

const Hero = ({ themeMode = 'light', className, ...rest }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <SectionHeader
      title={(
        <Typography variant="h2" component="span" className={classes.fontWeight900}>
          {t('Signata Governance Staking')}
        </Typography>
      )}
      subtitle={t('Get ready for NFT-based decentralized governance')}
      align="left"
      titleProps={{
        variant: 'h2',
        color: 'textPrimary',
      }}
      ctaGroup={[(
        <Button
          size="large"
          variant="contained"
          color="primary"
          component="a"
          href={t('nfg-whitepaper-2021-07-31.pdf')}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('read the governance whitepaper')}
        </Button>
      ),(
        <Button
          size="large"
          variant="outlined"
          color="primary"
          component="a"
          href='https://blog.congruentlabs.co/non-fungible-governance/'
          target="_blank"
          rel="noopener noreferrer"
        >
          Our Governance Model          
        </Button>
      )]}
      data-aos="fade-right"
      disableGutter
      className={classes.leftSideContent}
    />
  );
};

Hero.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * Theme mode
   */
  themeMode: PropTypes.string,
};

export default Hero;
