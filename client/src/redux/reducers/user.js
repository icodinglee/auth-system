const INITIAL_STATE = { profile: {}, error: ''}

function user(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'USER_PROFILE':
      return { ...state, profile: action.payload };
    case 'PROFILE_ERROR':
      return { ...state, error: action.payload };
    case 'CLEAR_ERRORS':
      return { ...state, error: '' };
    default:
      return state;
  }
}

export default user;
