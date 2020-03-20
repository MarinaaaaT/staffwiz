import { snakeToCamelCase } from 'json-style-converter/es5';
import Notifications from 'react-notification-system-redux';

import { getAllUsers } from '_api/users';
import { updateUsers } from '_actions/users';

import { dispatchError } from '_utils/api';

export const attemptGetUsers = () => dispatch =>
  getAllUsers().then(
    data => {
      dispatch(updateUsers(snakeToCamelCase(data.users)));
      return data.user;
    }, 
    
    err => {
      console.log('err', err)
    })
    .catch(dispatchError(dispatch));
