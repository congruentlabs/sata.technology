import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import Page from './components/Page';
import IndexView from './views/IndexView';

const NotFound = lazy(() => import('./views/NotFound'));

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
          <Route path="/" element={<IndexView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </HashRouter>
  </Page>
);

export default App;
