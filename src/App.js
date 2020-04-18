import React from 'react';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Home from './containers/Home';
import { Layout } from './components/Layout';

let routes = (
    <Switch>
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
    </Switch>
);

function App() {
  return (
    <Layout>
        {routes}
    </Layout>
  );
}

export default App;
