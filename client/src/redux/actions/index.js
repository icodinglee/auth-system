import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

const API_URL = 'http://localhost:3000';

//================================
// Utility actions
//================================

export function profileErrorHandler(error) {
  return {
    type: 'PROFILE_ERROR',
    payload: error
  };
}

export function loginErrorHandler(error) {
  return {
    type: 'LOGIN_ERROR',
    payload: error
  };
}

export function registerErrorHandler(error) {
  return {
    type: 'REGISTER_ERROR',
    payload: error
  };
}

export function clearErrors() {
  return {
    type: 'CLEAR_ERRORS'
  };
}

//================================
// Authentication actions
//================================

// TO-DO: Add expiration to cookie
export function loginUser({username, password}) {
  return function(dispatch) {
    axios.post(`${API_URL}/auth/login`, { username, password })
    .then(response => {
      cookie.save('token', response.data.token, { path: '/' });
      cookie.save('user', response.data.user, { path: '/' });
      dispatch({ type: 'AUTH_USER' });
      browserHistory.push(`/${response.data.user.name}`);
    })
    .catch(function(response) {
      dispatch(loginErrorHandler(response.data.error));
    })
  }
}

export function registerUser({ username, nickname, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/auth/register`, { username, nickname, password })
    .then(response => {
      cookie.save('token', response.data.token, { path: '/' });
      cookie.save('user', response.data.user, { path: '/' });
      dispatch({ type: 'AUTH_USER' });
      browserHistory.push(`/${response.data.user.name}`);
    })
    .catch(response => dispatch(registerErrorHandler(response.data.error)));
  }
}

export function logoutUser() {
  // Destroy token and user cookies
  cookie.remove('token', { path: '/' });
  cookie.remove('user', { path: '/' });
  browserHistory.push('/');
  return {
    type: 'UNAUTH_USER'
  }
}

export function getUserProfile(username) {
  return function(dispatch) {
    axios.get(`${API_URL}/users/${username}`)
    .then(response => {
      dispatch({ type: 'USER_PROFILE', payload: response.data });
    })
    .catch(response => dispatch(profileErrorHandler(response.data.error)));
  }
}

export function editUserProfile(profileId, nickname, address, postalcode) {
  return function(dispatch) {
    const uid = cookie.load('user').id
    if(profileId !== uid){
      dispatch(profileErrorHandler(response.data.error));
    } else {
      axios.put(`${API_URL}/users/${uid}`, { nickname, address, postalcode })
      .then(response => {
        dispatch({ type: 'USER_PROFILE', payload: response.data });
      })
      .catch(response => dispatch(profileErrorHandler(response.data.error)));
    }
  }
}