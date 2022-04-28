import React from 'react';
// import { Router } from 'react-router-dom';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
// import Routes from './Routes';
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

const browserHistory = createBrowserHistory();

const App = () => (
  <Page>
    <Router history={browserHistory}>
      <Route exact path="/" component={IndexView} />
      <Route exact path="/staking" component={Staking} />
      <Route exact path="/vote" component={Vote} />
      <Route to="/not-found" />
      {/* <Routes /> */}
    </Router>
  </Page>
);

export default App;
