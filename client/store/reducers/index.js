import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { reducer as alerts } from 'react-notification-system-redux';
import user from './user';
import todos from './todos';
import users from './users';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  alerts,
  user,
  todos,
  users,
});

export default createRootReducer;
