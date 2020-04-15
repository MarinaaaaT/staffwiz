import { snakeToCamelCase } from 'json-style-converter/es5';
import Notifications from 'react-notification-system-redux';
import { push } from 'connected-react-router';

import { getAllUsers, addNewStaff } from '_api/users';
import { updateUsers, addNewUser } from '_actions/users';

import { dispatchError } from '_utils/api';

export const attemptGetUsers = () => dispatch =>
  getAllUsers().then(
    data => {
      dispatch(updateUsers(snakeToCamelCase(data.users)));
      return data.users;
    }, 
    
    err => {
      console.log('err', err)
    })
    .catch(dispatchError(dispatch));

export const attemptAddNewStaff = user => dispatch =>
  addNewStaff(user)
    .then(data => {
      dispatch(Notifications.success({
        title: 'Success!',
        message: data.message,
        position: 'tr',
        autoDismiss: 3,
      }));
    })
    .then(() => dispatch(push('/staff')))
    .catch(dispatchError(dispatch));
