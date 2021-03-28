import React from 'react';
import { Divider } from '@material-ui/core';
import { Section, SectionAlternate } from 'components/organisms';
import {
  Vision,
  Services,
  Hero,
  ICO,
  Features,
  Roadmap,
  Team,
} from './components';

// const useStyles = makeStyles(() => ({
//   sectionAlternateNoPaddingTop: {
//     '& .section-alternate__content': {
//       paddingBottom: 0,
//     },
//   },
//   dividerSection: {
//     paddingTop: 0,
//     paddingBottom: 0,
//   },
// }));

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
        <ICO />
      </Section>
      <Section>
        <Roadmap />
      </Section>
      <Divider />
      <SectionAlternate>
        <Team />
      </SectionAlternate>
      <Divider />
    </div>
);

export default IndexView;
