import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Typography,
  colors,
} from '@material-ui/core';
import { Icon } from 'components/atoms';
import { SectionHeader, TypedText } from 'components/molecules';
import { HeroShaped } from 'components/organisms';
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

  const title = (
    <Typography variant="h2" component="span" className={classes.fontWeight900}>
      {t('The future of')}
      <br />
      <TypedText
        component="span"
        variant="h2"
        color="secondary"
        className={classes.fontWeight900}
        typedProps={{
          strings: [
            t('Authentication'),
            t('Authorization'),
            t('Payments'),
            t('Privacy'),
            t('Identity'),
          ],
          typeSpeed: 80,
          loop: true,
        }}
      />
    </Typography>
  );

  const docsButton = (
    <Button
      size="large"
      variant="contained"
      color="primary"
      component="a"
      href={t('whitepaper url')}
      target="_blank"
      rel="noopener noreferrer"
    >
      {t('read the whitepaper')}
    </Button>
  );

  const telegramButton = (
    <Button
      href={t('telegram url')}
      target="_blank"
      variant="text"
      alt="SATA Telegram"
      color="primary"
      startIcon={<Icon size="small" fontIconClass="fab fa-telegram" color={colors.blue} />}
    > 
      Telegram
    </Button>
  );

  const discordButton = (
    <Button
      href="https://discord.gg/pEJu4ZjnfX"
      target="_blank"
      variant="text"
      alt="SATA Discord"
      color="primary"
      startIcon={<Icon size="small" fontIconClass="fab fa-discord" color={colors.blue} />}
    > 
      Discord
    </Button>
  );

  const leftSideContent = (
    <SectionHeader
      title={title}
      subtitle={t('subtitle')}
      align="left"
      titleProps={{
        variant: 'h2',
        color: 'textPrimary',
      }}
      ctaGroup={[docsButton, telegramButton, discordButton]}
      data-aos="fade-right"
      disableGutter
      className={classes.leftSideContent}
    />
  );
  return (
    <div className={className} {...rest}>
      <HeroShaped
        className={classes.heroShaped}
        leftSide={leftSideContent}
        rightSide={(
          <div
            className={clsx(
              classes.imageAnimation,
              themeMode === 'dark' ? classes.imageAnimationDark: '',
            )}
          />
        )}
      />
    </div>
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
