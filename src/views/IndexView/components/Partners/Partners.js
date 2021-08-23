import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { Image, LearnMoreLink } from 'components/atoms';
import { CardBase } from 'components/organisms';

const useStyles = makeStyles(theme => ({
  partnerItem: {
    height: '100%',
  },
  partnerCard: {
    borderRadius: theme.spacing(3),
  },
  image: {
    objectFit: 'cover',
  },
}));

const Partners = props => {
  const { themeMode, className, ...rest } = props;
  const classes = useStyles();

  return (
    <div className={className} {...rest}>
      <Grid container spacing={2} justify="center">
        {[
          {
            logo: "chainlink.png",
            logoAlt: "Chainlink Logo",
            text: "Chainlink",
            type: "Integration",
            learnMoreLink: "https://blog.congruentlabs.co/signata-will-leverage-chainlink-oracles-to-power-its-on-chain-identity-management-system/",
          },
          {
            logo: themeMode === "light" ? "upsurge.png" : "upsurge-dark.png",
            logoAlt: "Upsurge Studios Logo",
            text: "Upsurge Studios",
            type: "Partnership",
            learnMoreLink: "https://blog.congruentlabs.co/announcing-partnership-with-upsurge-studios/",
          },
        ].map((partner) => (
          <Grid
            className={classes.partnerItem}
            item
            key={partner.text}
            md={4}
            xs={12}
          >
            <CardBase className={classes.partnerCard}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Image
                    alt={partner.logoAlt}
                    className={classes.image}
                    src={partner.logo}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    align="left"
                    color="textPrimary"
                    component="p"
                    variant="h6"
                  >
                    {partner.text}
                  </Typography>
                  <Typography
                    align="left"
                    color="textSecondary"
                    component="p"
                    variant="subtitle1"
                  >
                    {partner.type}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'left' }}>
                  <LearnMoreLink
                    color="primary"
                    href={partner.learnMoreLink}
                    title="Learn more"
                    variant="body1"
                  />
                </Grid>
              </Grid>
            </CardBase>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

Partners.propTypes = {
  className: PropTypes.string,
};

export default Partners;
