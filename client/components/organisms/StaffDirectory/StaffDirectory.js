import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from 'ramda';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { push } from 'connected-react-router';

import { attemptGetUsers } from '_thunks/users';
import Box from '_molecules/Box';
import UserResult from '../../molecules/UserResult';

export default function StaffDirectory({staffList}) {
  const dispatch = useDispatch();

  const resetState = () => {
    console.log("RESET ON STAFF DIRECTORY");
  };


  useEffect(() => {
    dispatch(attemptGetUsers())
      .then()
      .catch(R.identity);
    resetState();
  }, []);

  const refresh = () => {
    dispatch(attemptGetUsers())
      .then()
      .catch(R.identity);
  };

  const addNewStaff = () => {
    dispatch(push('/staff/newstaff'));
  }

  //TODO only feed user into user result and deal with it accordingly in User Result
  
  return (
    <Box className="general-profile">
      <span className="icon is-medium is-pulled-right" onClick={refresh} onKeyPress={refresh}>
        <FontAwesomeIcon icon={faSync} size="lg" />
      </span>
      <span className="icon is-medium is-pulled-right" onClick={addNewStaff} onKeyPress={addNewStaff}>
        <FontAwesomeIcon icon={faPlus} size="lg" />
      </span>
      <h3 className="title is-3">
        Staff Directory
      </h3 >
      <hr className="separator" />
      <h3 className="title is-3"> All Staff </h3>
      <div className="columns" id="staff-list">
          {staffList.map(userX => <UserResult firstName = {userX.firstName} lastName = {userX.lastName} profilePic = {userX.profilePic} level = {userX.level} department = {userX.department} user = {userX}/>)}
      </div>
    </Box>
  );
}
