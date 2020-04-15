import update from 'immutability-helper';
import { UPDATE_USERS, ADD_USER } from '_actions/users';

export default function users(state = {}, action) {
  switch (action.type) {
    case UPDATE_USERS:
      return update(state, { $merge: action.users });
//TODO make add user add to existing list of users not replace it
    case ADD_USER:
      return update(state, { $merge: action.users })
    default:
      return state;
  }
}
