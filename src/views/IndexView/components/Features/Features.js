import React from 'react';
import PropTypes from 'prop-types';
import { Grid, colors, makeStyles } from '@material-ui/core';
import { SectionHeader, IconAlternate } from 'components/molecules';
import { CardBase, DescriptionListIcon } from 'components/organisms';

const useStyles = makeStyles(() => ({
  fontWeight900: {
    fontWeight: 900,
  },
}));

const data = [{
  icon: 'fas fa-sign-in-alt',
  color: colors.green,
  title: 'Simplified Access Control',
  subtitle: 'No more usernames, and no more passwords.',
}, {
  icon: 'fas fa-exchange-alt',
  color: colors.green,
  title: 'DeREx',
  subtitle: 'Use our Decentralized Rights Exchange for trusted identity brokerage.',
}, {
  icon: 'fas fa-certificate',
  color: colors.green,
  title: 'DeX509',
  subtitle: 'Get the power of Public Key Infrastructure without the expense.',
}, {
  icon: 'fas fa-code-branch',
  color: colors.green,
  title: 'Trusted Validation Oracles',
  subtitle: 'Prove your identity and still maintain your privacy.',
}, {
  icon: 'fas fa-rocket',
  color: colors.green,
  title: 'Free and Open',
  subtitle: 'Open source smart contracts and off-chain services.',
}, {
  icon: 'fas fa-code',
  color: colors.green,
  title: 'Anonymous First',
  subtitle: 'All systems will be default Anonymous. Only share what you want.',
}];

const Features = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title="The Future Identity and Access Marketplace"
        fadeUp
        titleProps={{
          variant: 'h3',
          color: 'textPrimary',
          className: classes.fontWeight900,
        }}
      />
      <Grid container spacing={2}>
        {data.map((adv, index) => (
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
