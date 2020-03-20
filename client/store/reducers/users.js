import update from 'immutability-helper';
import { UPDATE_USERS } from '_actions/users';

export default function users(state = {}, action) {
  switch (action.type) {
    case UPDATE_USERS:
      return update(state, { $merge: action.users });
    default:
      return state;
  }
}
