import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import { SectionHeader } from 'components/molecules';
import { Image } from 'components/atoms';

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
  listAvatar: {
    width: 120,
    height: 120,
  },
  fontWeight900: {
    fontWeight: 900,
  },
  image: {
    width: 'auto',
    height: 200,
  },
}));


const ICO = ({ className, ...rest }) => {
  const classes = useStyles();

  const { t } = useTranslation();

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
      <Grid container style={{ textAlign: 'center' }} spacing={4}>
        <Grid item xs={12} className={classes.gridItem}>
          <a href="https://trello.com/b/IJVDJZ39/sata-roadmap" target="_blank" rel="noreferrer">
            <Image
              src="trello.png"
              alt="Trello Picture"
              className={classes.image}
            />
          </a>
        </Grid>
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
