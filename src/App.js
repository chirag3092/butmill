import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBulider from './components/containers/BurgerBuilder/BurgerBulider';
import Checkout from './components/containers/Checkout';
import Orders from './components/containers/Orders';


function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />    
          <Route path="/" component={BurgerBulider} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
