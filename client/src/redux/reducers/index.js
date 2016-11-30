import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth';
import userReducer from './user';
import imageReducer from './image';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  image: imageReducer,
  routing: routerReducer
});

export default rootReducer;
