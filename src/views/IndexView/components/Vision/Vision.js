import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme, Grid, useMediaQuery, Typography } from '@material-ui/core';
import { SectionHeader } from 'components/molecules';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  quickStartSection: {
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
  fontWeightBold: {
    fontWeight: '900',
  },
  editor: {
    paddingLeft: `${theme.spacing(2)}px !important`,
    paddingRight: `${theme.spacing(2)}px !important`,
    borderRadius: theme.spacing(1/2),
    width: '100%',
  },
  logoImg: {
    maxWidth: 100,
  },
}));

const Vision = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest} id="vision">
      <Grid container justify="space-between" spacing={4}>
        <Grid item xs={12}>
          <Grid container justify="space-between" spacing={isMd ? 4 : 2} direction={isMd ? 'row': 'column-reverse'}>
            <Grid item xs={12} container alignItems="center" md={6} data-aos={'fade-right'}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography color="textPrimary" variant="body1">
                  {t('Our personal information is collected by')}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="textPrimary" variant="body1">
                    {t('Governments try to combat this with legislation')}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="textPrimary" variant="body1">
                    {t('As for service providers')}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="textPrimary" variant="body1">
                    {t('Congruent Labs is developing the Identity')}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="textPrimary" variant="body1">
                    {t('The IdGAF is a decentralized')}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="textPrimary" variant="body1">
                    {t('IdGAF will provide a zero-trust')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} data-aos={'fade-left'}>
              <SectionHeader
                title={t('Our Vision')}
                subtitle={t('Identity and Access without')}
                align="left"
                disableGutter
                titleVariant="h3"
                titleProps={{ className: classes.fontWeightBold }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

Vision.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Vision;
