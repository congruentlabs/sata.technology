import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { LearnMoreLink } from 'components/atoms';
import { SectionHeader } from 'components/molecules';
import { CardBase } from 'components/organisms';

const useStyles = makeStyles(theme => ({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: theme.spacing(1),
  },
  listItemAvatar: {
    marginRight: theme.spacing(3),
  },
  gridCard: {
    padding: theme.spacing(2),
    background: theme.palette.alternate.main,
    borderRadius: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4),
    },
    
  },
  gridItem: {
    height: '100%',
  },
  reviewCount: {
    marginLeft: theme.spacing(1),
  },
  image: {
    objectFit: 'cover',
  },
  fontWeight700: {
    fontWeight: 700,
  },
}));

const Governance = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title="Token Governance"
        data-aos="fade-up"
        titleProps={{
          variant: 'h2',
          color: 'textPrimary',
        }}
        ctaGroup={[
          (<Button
            size="large"
            variant="contained"
            color="primary"
            component="a"
            href="/nfg-whitepaper-2021-07-31.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Governance Whitepaper
          </Button>),
          (<Button
            size="large"
            variant="contained"
            color="primary"
            component="a"
            href="/staking"
          >
            Governance Staking
          </Button>),
        ]}
      />
      <Grid container spacing={4} justify="center">
        <Grid item xs={12}>
          <Grid container justify="space-between" spacing={isMd ? 4 : 2} direction={isMd ? 'row': 'column-reverse'}>
            <Grid item xs={12} container alignItems="center" data-aos={'fade-right'}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12}>
                  <Typography color="textPrimary" variant="body1" gutterBottom>
                    The Signata token project will transition to a decentralized governance token, with Non-Fungible Tokens representing classes of voting rights for the project future.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} className={classes.gridItem}>
          <CardBase className={classes.cardBase}>
            <Grid container spacing={1}>
              <Grid item xs={6} style={{ textAlign: 'center' }}>
                <LearnMoreLink
                  title="Read the Blog Post"
                  href="https://blog.congruentlabs.co/non-fungible-governance"
                  variant="h6"
                  color="primary"
                />
              </Grid>
              <Grid item xs={6} style={{ textAlign: 'center' }}>
                <LearnMoreLink
                  title="Register Partnership Interest"
                  href="https://forms.gle/ppLft9dvvziNJevn7"
                  variant="h6"
                  color="primary"
                />
              </Grid>
            </Grid>
          </CardBase>
        </Grid>
      </Grid>
    </div>
  );
};

Governance.propTypes = {
  className: PropTypes.string,
};

export default Governance;
