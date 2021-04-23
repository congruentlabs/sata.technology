import React from 'react';
import PropTypes from 'prop-types';
import { Grid, colors, makeStyles } from '@material-ui/core';
import { SectionHeader, IconAlternate } from 'components/molecules';
import { CardBase, DescriptionListIcon } from 'components/organisms';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  fontWeight900: {
    fontWeight: 900,
  },
}));

const Features = ({ className, ...rest }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title={t('The Future Identity and Access Marketplace')}
        fadeUp
        titleProps={{
          variant: 'h3',
          color: 'textPrimary',
          className: classes.fontWeight900,
        }}
      />
      <Grid container spacing={2}>
        {[{
          icon: 'fas fa-sign-in-alt',
          color: colors.green,
          title: t('Simplified Access Control'),
          subtitle: t('No more usernames, and no more passwords.'),
        }, {
          icon: 'fas fa-exchange-alt',
          color: colors.green,
          title: t('DeREx'),
          subtitle: t('Use our Decentralized Rights Exchange for trusted identity brokerage.'),
        }, {
          icon: 'fas fa-certificate',
          color: colors.green,
          title: t('DeX509'),
          subtitle: t('Get the power of Public Key Infrastructure without the expense.'),
        }, {
          icon: 'fas fa-code-branch',
          color: colors.green,
          title: t('Trusted Validation Oracles'),
          subtitle: t('Prove your identity and still maintain your privacy.'),
        }, {
          icon: 'fas fa-rocket',
          color: colors.green,
          title: t('Free and Open'),
          subtitle: t('Open source smart contracts and off-chain services.'),
        }, {
          icon: 'fas fa-code',
          color: colors.green,
          title: t('Anonymous First'),
          subtitle: t('All systems will be default Anonymous. Only share what you want.'),
        }].map((adv, index) => (
          <Grid
            key={index}
            item
            container
            alignItems="center"
            direction="column"
            xs={6}
            md={4}
            data-aos="fade-up"
          >
            <CardBase
              liftUp
              variant="outlined"
              style={{ borderTop: `5px solid ${adv.color[500]}` }}
            >
              <DescriptionListIcon
                icon={
                  <IconAlternate
                    fontIconClass={adv.icon}
                    color={adv.color}
                    shape="circle"
                    size="small"
                  />
                }
                title={adv.title}
                subtitle={adv.subtitle}
                align="left"
              />
            </CardBase>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

Features.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Features;
