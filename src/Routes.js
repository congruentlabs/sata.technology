import React from 'react';
import { Switch, Route } from 'react-router';

import {
  IndexView,
  Staking,
  Vote,
} from './views';


const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={IndexView} />
      <Route path="/staking" component={Staking} />
      <Route path="/vote" component={Vote} />
      <Route to="/not-found" />
    </Switch>
  );
};

export default Routes;
