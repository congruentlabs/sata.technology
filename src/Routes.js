/**
 * Caution: Consider this file when using react-scripts
 * 
 * You may delete this file and its occurrences from the project filesystem if you are using GatsbyJS or NextJS version
 */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import WithLayout from './WithLayout';
import { Main as MainLayout } from './layouts';

import { IndexView, DemoView } from './views';

const Routes = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={matchProps => (
          <WithLayout
            {...matchProps}
            component={IndexView}
            layout={MainLayout}
          />
        )}
      />
      <Route
        exact
        path="/demo"
        render={matchProps => (
          <WithLayout
            {...matchProps}
            component={DemoView}
            layout={MainLayout}
          />
        )}
      />
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
