import React from 'react';
import { Divider } from '@material-ui/core';
import { Section } from 'components/organisms';
import {
  StakingHero,
  StakingSection,
} from './components';

const StakingView = () => (
    <div>
      <Section>
        <StakingHero />
      </Section>
      <Section>
        <StakingSection />
      </Section>
    </div>
);

export default StakingView;
