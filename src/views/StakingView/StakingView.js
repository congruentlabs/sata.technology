import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Section } from 'components/organisms';
import {
  StakingHero,
  StakingSection,
} from './components';

const useStyles = makeStyles(() => ({
  sectionNoPaddingTop: {
    paddingTop: 0,
  },
  sectionPaddingBottom: {
    paddingBottom: 30,
  },
}));

const StakingView = () => {  
  const classes = useStyles();

  return (
    <div>
      <Section className={classes.sectionPaddingBottom}>
        <StakingHero />
      </Section>
      <Section className={classes.sectionNoPaddingTop}>
        <StakingSection />
      </Section>
    </div>
)};

export default StakingView;
