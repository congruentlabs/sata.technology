import React from 'react';
import { Divider } from '@material-ui/core';
import { Section, SectionAlternate } from 'components/organisms';
import {
  Authorize,
  Authenticate,
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

const DemoView = ({ themeMode }) => (
    <div>
      <Section>
        <Authenticate />
      </Section>
      <Divider />
      <SectionAlternate>
        <Authorize />
      </SectionAlternate>
      <Divider />
    </div>
);

export default DemoView;
