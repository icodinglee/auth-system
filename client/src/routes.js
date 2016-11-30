import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import cookie from 'react-cookie';
import { Provider } from 'react-redux';
import store, { history } from './redux/store';

import App from './ui/App';
import Home from './ui/home/Home';
import LogIn from './ui/auth/LogIn';
import SignUp from './ui/auth/SignUp';
import Account from './ui/Account';
import Settings from './ui/user/Settings';
import AppNotFound from './ui/shared/AppNotFound';

import './assets/stylesheets/common.css';

const requireAuth = () => {
  // require auth
  if (!cookie.load('token')) {
    location.replace('/');
  }
}

export const renderRoutes = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/account" component={Account} />
        <Route path="/settings" component={Settings} onEnter={requireAuth} />
        <Route path="/:username" component={Account} />
        <Route path="*" component={AppNotFound} status={404} />
      </Route>
    </Router>
  </Provider>
);
