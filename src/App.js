import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Home from './containers/Home';
import AddFlight from './containers/AddFlight';
import { Layout } from './components/Layout';
let routes = (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/addflight" component={AddFlight} />
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
export default withRouter(App);
