import React from 'react';
import PropTypes from 'prop-types';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Typography, colors } from '@material-ui/core';
import { IconAlternate, SectionHeader } from 'components/molecules';
import { DescriptionListIcon, Section } from 'components/organisms';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  fontWeight900: {
    fontWeight: 900,
  },
  noPaddingBottom: {
    paddingBottom: 0,
  },
  noPaddingTop: {
    paddingTop: 0,
  },
}));

const Services = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
   
  const title = (
    <Typography variant="h2" component="span" className={classes.fontWeight900}>
      {t('Access and Authorization on the')}&nbsp;
      <Typography component="span" variant="inherit" color="primary">{t('Blockchain')}</Typography>
    </Typography>
  );

  return (
    <div className={className} {...rest}>
      <Section narrow className={classes.noPaddingBottom}>
        <SectionHeader
          title={title}
          subtitle={''}
          align="center"
          titleProps={{
            variant: 'h2',
            color: 'textPrimary',
          }}
          data-aos="fade-up"
        />
      </Section>
      <Section className={classes.noPaddingTop}>
        <Grid container spacing={isMd ? 4 : 2}>
          {[
            {
              icon: 'fas fa-key',
              title: t('Hardware Key Protection'),
              subtitle: t('Use Signata to store'),
            },
            {
              icon: 'fas fa-id-badge',
              title: t('Decentralized Identity'),
              subtitle: t('Authenticate and Authorize access'),
            },
            {
              icon: 'fas fa-shopping-cart',
              title: t('Anonymous Payments'),
              subtitle: t('Authenticate and pay for services'),
            },
          ].map((item, index) => (
            <Grid key={index} item xs={12} sm={4} data-aos={'fade-up'}>
              <DescriptionListIcon
                title={item.title}
                subtitle={item.subtitle}
                icon={
                  <IconAlternate
                    fontIconClass={item.icon}
                    size="medium"
                    color={colors.blue}
                  />
                }
                align="left"
              />
            </Grid>
          ))}
        </Grid>
      </Section>
    </div>
  );
};

Services.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Services;
