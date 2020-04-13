import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from 'ramda';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import { attemptGetUsers } from '_thunks/users';
import Box from '_molecules/Box';
import UserResult from '../../molecules/UserResult';

export default function StaffDirectory({staffList, updateUsers}) {
  const dispatch = useDispatch();

  const resetState = () => {
    console.log("RESET");
  };


  useEffect(() => {
    dispatch(attemptGetUsers())
      .then()
      .catch(R.identity);
    console.log("USE EFFECT");
    resetState();
  }, []);

  const refresh = () => {
    console.log("REFRESH");
    dispatch(attemptGetUsers())
      .then()
      .catch(R.identity);
  };

  return (
    console.log("VIEW RENDERED"),
    <Box className="general-profile">
      <span className="icon is-medium is-pulled-right" onClick={updateUsers} onKeyPress={refresh}>
        <FontAwesomeIcon icon={faSync} size="lg" />
      </span>
      <h3 className="title is-3">
        Staff Directory
      </h3 >
      <hr className="separator" />
      <h3 className="title is-3"> All Staff </h3>
      <div className="columns" id="staff-list">
          {staffList.map(userX => <UserResult firstName = {userX.firstName} lastName = {userX.lastName} profilePic = {userX.profilePic}/>)} 
      </div>
    </Box>
  );
}
