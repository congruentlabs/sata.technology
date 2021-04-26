import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import {
  useMediaQuery,
  colors,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { Image } from 'components/atoms';
import { SectionHeader, IconAlternate } from 'components/molecules';

const useStyles = makeStyles(theme => ({
  listItemAvatar: {
    marginRight: theme.spacing(2),
  },
  coverImage: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: 200,
    },
  },
  avatar: {
    width: 60,
    height: 60,
    marginLeft: theme.spacing(-2),
    border: `4px solid ${theme.palette.background.paper}`,
    boxShadow: `0 2px 10px 0 ${theme.palette.cardShadow}`,
    '&:first-child': {
      marginLeft: 0,
    },
  },
  fontWeight900: {
    fontWeight: 900,
  },
}));


const ICO = ({ className, ...rest }) => {
  const classes = useStyles();

  const theme = useTheme();
  const { t } = useTranslation();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title={t('Product Roadmap')}
        align="center"
        titleProps={{
          variant: 'h2',
          color: 'textPrimary',
          className: classes.fontWeight900,
        }}
      />
      <Grid container spacing={isMd ? 4 : 2}>
        {[
          {
            title: t('Q2 2021'),
            img: 'logo.png',
            color: colors.lightBlue,
            headerColor: "secondary",
            items: [
              { text: t('Token Launch') },
              { text: t('Whitepaper Release') },
              { text: t('Liquidity Distributed') },
            ],
          },
          {
            title: t('Q4 2021'),
            img: 'logo.png',
            color: colors.lightBlue,
            headerColor: "secondary",
            items: [
              { text: t('First Marketplace Release') },
              { text: t('Proof of Concept Launch') },
              { text: t('DeX509 & DeREx First Releases') },
            ],
          },
          {
            title: t('2022'),
            img: 'logo.png',
            color: colors.lightBlue,
            headerColor: "secondary",
            items: [
              { text: t('Marketplace Adoption') },
              { text: t('Alternative Chain Integration') },
              { text: t('Enterprise Integration') },
            ],
          },
          {
            title: t('2023 +'),
            img: 'logo.png',
            color: colors.lightBlue,
            headerColor: "secondary",
            items: [
              { text: t('Scaling Up') },
              { text: t('More Integrations') },
              { text: t('Greater Product Adoption') },
            ],
          }
        ].map((i) => (
          <Grid key={i.title} item xs={12}>
            <Grid container spacing={isMd ? 4 : 2}>
              <Grid
                item
                container
                justify="center"
                alignItems="center"
                xs={12}
                md={3}
                data-aos="fade-up"
              >
                <Image
                  src={i.img}
                  alt="..."
                  className={classes.coverImage}
                  lazy={false}
                />
              </Grid>
              <Grid item xs={12} md={9} data-aos="fade-up">
                <SectionHeader
                  title={
                    <Typography color={i.headerColor} variant="inherit" component="span">
                      {i.title}
                    </Typography>
                  }
                  // subtitle="Token Launch"
                  align="left"
                  disableGutter
                />
                <List disablePadding>
                  {i.items.map((t) => (
                    <ListItem key={t.text} disableGutters data-aos="fade-up">
                      <ListItemAvatar className={classes.listItemAvatar}>
                        <IconAlternate
                          size="small"
                          fontIconClass="fas fa-arrow-alt-circle-right"
                          color={i.color}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={t.text}
                        // secondary="test"
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

ICO.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default ICO;
