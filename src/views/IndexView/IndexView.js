import React from 'react';
import { Divider } from '@material-ui/core';
import { Section, SectionAlternate } from 'components/organisms';
import {
  Vision,
  Services,
  Hero,
  Token,
  Features,
  Roadmap,
  Team,
  Governance,
  Partners,
} from './components';

const IndexView = ({ themeMode }) => (
    <div>
      <Hero
        themeMode={themeMode}
      />
      <Services />
      <Divider />
      <SectionAlternate>
        <Vision />
      </SectionAlternate>
      <SectionAlternate>
        <Features />
      </SectionAlternate>
      <Divider />
      <Section narrow>
        <Token />
      </Section>
      <Divider />
      <SectionAlternate innerNarrowed>
        <Governance />
      </SectionAlternate>
      <Divider />
      <Section>
        <Roadmap />
      </Section>
      <Divider />
      <SectionAlternate>
        <Team />
      </SectionAlternate>
      <Divider />
      <Section>
        <Partners
          themeMode={themeMode}
        />
      </Section>
      <Divider />
    </div>
);

export default IndexView;
