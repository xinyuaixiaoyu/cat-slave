import React from 'react';
import ReactDom from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Introduction from '@/components/Introduction/index';
import Navigation from '@/components/Navigation/index';
import RouterConfig from '@/config/router.config';
import '@babel/polyfill';
import './index.less';

const App = () => {
  return (
    <Router>
      <div styleName="container">
        <div styleName="left-container">
          <div styleName="content">
            <Introduction></Introduction>
            <Navigation></Navigation>
          </div>
        </div>
        <div styleName="right-container">
          <Switch>
            {RouterConfig.map((item) => {
              return (
                <Route
                  path={item.path}
                  component={item.Component()}
                  exact={item.exact}
                  key={item.path}
                ></Route>
              );
            })}
            <Redirect to="/"></Redirect>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

ReactDom.render(<App />, document.getElementById('App'));
