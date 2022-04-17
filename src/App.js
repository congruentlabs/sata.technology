import React from 'react';
// import { Router } from 'react-router-dom';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
// import Routes from './Routes';
import Page from './components/Page';
import {
  IndexView,
  Staking,
} from './views';

import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';

import 'scss/react-images.scss';
import 'scss/slick-slider.scss';

const browserHistory = createBrowserHistory();

const App = () => {
  return (
    <Page>
      <Router history={browserHistory}>
        <Route path="/" component={IndexView} />
        <Route path="/staking" component={Staking} />
        <Route to="/not-found" />
        {/* <Routes /> */}
      </Router>
    </Page>
  );
};

export default App;
