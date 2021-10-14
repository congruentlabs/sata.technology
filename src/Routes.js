import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import {
  IndexView,
  Staking,
} from './views';


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <IndexView />} />
      <Route exact path="/staking" render={() => <Staking />} />
      <Redirect to="/not-found-cover" />
    </Switch>
  );
};

export default Routes;
