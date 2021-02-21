import React, {Component, Suspense} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch } from 'react-router-dom';

const App = () => {
  const asyncOrders = React.lazy(() => import('./containers/Orders/Orders'));
  const asyncCheckout = React.lazy(() => import('./containers/Checkout/Checkout'));
  const asyncAuth = React.lazy(() => import('./containers/Auth/Auth'));
  const routes = (
    <Switch>
      <Route path="/checkout" component={ asyncCheckout } />
      <Route path="/orders" component={ asyncOrders } />
      <Route path="/auth" component={ asyncAuth } />
      <Route path="/auth/logout" component={ asyncAuth } />
      <Route path="/" exact component={ BurgerBuilder } />
    </Switch>
  )
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
}

export default App;
