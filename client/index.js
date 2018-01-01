import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import setAuthorizationToken from './utils/setAuthorizationToken';

import App from './App';

import jwt from 'jsonwebtoken';
import { setCurrentUser } from './actions/authActions';

if(localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);