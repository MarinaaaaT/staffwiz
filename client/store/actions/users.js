export const UPDATE_USERS = 'UPDATE_USERS';
export const ADD_USER = 'ADD_USER';

export function updateUsers(users) {
  return {
    type: UPDATE_USERS,
    users,
  };
}

export function addNewUser(user) {
  return {
    type: ADD_USER,
    user,
  };
}
