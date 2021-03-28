import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme, Grid, useMediaQuery, Typography } from '@material-ui/core';
import { SectionHeader } from 'components/molecules';

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
                  Our personal information is collected by the online services
                  we interact with on a daily basis, bundled up and sold for marketing
                  and advertising purposes, edging us closer to an Orwellian future.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="textPrimary" variant="body1">
                    Governments try to combat this with legislation, and
                    privacy-focused products try to limit what information is shared
                    to 3rd parties, but it still hasn't stymied the flow of continued
                    collection, sale, and distribution of our Privacy.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="textPrimary" variant="body1">
                    As for service providers, the legislative, administrative, and
                    financial burden added from collecting personal and payment
                    information and ensures that the build and release of systems
                    takes longer, costs more, requires more engineering effort, and
                    are exposed to more vectors of attack.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="textPrimary" variant="body1">
                    Congruent Labs is developing the Identity Guard & Anonymity
                    Framework (IdGAF) in conjunction with the release of the SATA
                    token as a means to wrestle back control of our identities from
                    big tech.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="textPrimary" variant="body1">
                    The IdGAF is a decentralized, jurisdiction-free, and
                    privacy-preserving solution to online identities, leveraging existing
                    identity management protocols and bleeding-edge blockchain smart
                    contract technology.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="textPrimary" variant="body1">
                    IdGAF will provide a zero-trust payment, authentication, and
                    authorization solution to allow online platforms to greatly reduce
                    the cost of compliance and payments management. These systems will
                    operate as a common standard, implemented through a series of smart
                    contracts and public off-chain systems.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} data-aos={'fade-left'}>
              <SectionHeader
                title="Our Vision"
                subtitle="Identity and Access without the control of Big Tech."
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
