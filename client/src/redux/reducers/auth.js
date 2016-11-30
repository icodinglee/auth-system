const INITIAL_STATE = { registerError: '', loginError: '', currentUser: {}, authenticated: false}

function auth(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'AUTH_USER':
      return { ...state, currentUser: action.payload, authenticated: true };
    case 'UNAUTH_USER':
      return { ...state, authenticated: false };
    case 'REGISTER_ERROR':
      return { ...state, registerError: action.payload };
    case 'LOGIN_ERROR':
      return { ...state, loginError: action.payload };
    case 'CLEAR_ERRORS':
      return { ...state, loginError: '', registerError: '' };
    default:
      return state;
  }
}

export default auth;
