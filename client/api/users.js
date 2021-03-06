import request from 'superagent';
import { handleSuccess, handleError } from '_utils/api';

export const postCheckUsername = username =>
  request.post('/api/users/checkusername')
    .send({ username })
    .then(handleSuccess)
    .catch(handleError);

export const getAllUsers = () =>
  request.get('/api/users/')
    .then(handleSuccess)
    .catch(handleError);

export const addNewStaff = user =>
  request.post('/api/users/addNewStaff')
    .send(user)
    .then(handleSuccess)
    .catch(handleError);

//TODO edit staff not done yet
export const putStaffMember = user =>
  request.put('/api/users/editStaffMember/' + user.username + '/')
    .send(user)
    .then(handleSuccess)
    .catch(handleError);

export const placeholder = () => {};