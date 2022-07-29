import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Page from './components/Page';
import {
  IndexView,
  Vote,
  Staking,
} from './views';

import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';

import 'scss/react-images.scss';
import 'scss/slick-slider.scss';

const App = () => (
  <Page>
    <HashRouter>
      <Routes>
        <Route path="/" element={<IndexView />} />
        <Route path="staking" element={<Staking />} />
        <Route path="vote" element={<Vote />} />
      </Routes>
    </HashRouter>
  </Page>
);

export default App;
