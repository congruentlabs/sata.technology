import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import Page from './components/Page';
import Dashboard from './views/Dashboard';

const IdentityDetail = lazy(() => import('./views/IdentityDetail'));
const IndexView = lazy(() => import('./views/IndexView'));
const Vote = lazy(() => import('./views/Vote'));
const Staking = lazy(() => import('./views/Staking'));
const NotFound = lazy(() => import('./views/NotFound'));

import 'react-lazy-load-image-component/src/effects/blur.css';
import 'aos/dist/aos.css';
import 'scss/react-images.scss';

const RouteFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
    <CircularProgress />
  </Box>
);

const App = () => (
  <Page>
    <HashRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="identity/:id" element={<IdentityDetail />} />
          <Route path="about" element={<IndexView />} />
          <Route path="staking" element={<Staking />} />
          <Route path="vote" element={<Vote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </HashRouter>
  </Page>
);

export default App;
