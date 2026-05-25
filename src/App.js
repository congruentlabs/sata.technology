import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Page from './components/Page';
import { Dashboard, IdentityDetail, IndexView, Vote, Staking, NotFound } from './views';

import 'react-lazy-load-image-component/src/effects/blur.css';
import 'aos/dist/aos.css';
import 'scss/react-images.scss';

const App = () => (
  <Page>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="identity/:id" element={<IdentityDetail />} />
        <Route path="about" element={<IndexView />} />
        <Route path="staking" element={<Staking />} />
        <Route path="vote" element={<Vote />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  </Page>
);

export default App;
