import React from 'react';
import { Divider } from '@material-ui/core';
import { Section, SectionAlternate } from 'components/organisms';
import {
  Authorize,
  Authenticate,
  Destroy,
  Lock,
  Unlock,
  Rollover,
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
      <Section>
        <Authorize />
      </Section>
      <Section>
        <Rollover />
      </Section>
      <Section>
        <Lock />
      </Section>
      <Section>
        <Unlock />
      </Section>
      <Section>
        <Destroy />
      </Section>
      <Divider />
    </div>
);

export default DemoView;
