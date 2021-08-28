import React from 'react';
import { Divider } from '@material-ui/core';
import { Section } from 'components/organisms';
import {
  Authorize,
  Authenticate,
  Destroy,
  Lock,
  Unlock,
  Rollover,
} from './components';

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
