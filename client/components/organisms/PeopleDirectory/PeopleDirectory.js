import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from 'ramda';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import { attemptGetUsers } from '_thunks/users';
import Box from '_molecules/Box';
import UserResult from '../../molecules/UserResult';

export default function PeopleDirectory() {
  const dispatch = useDispatch();

  let { users } = useSelector(R.pick(['users']));
  const [staffList, setStaffList] = useState([] || []);

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
    const mapUsersToStaff = Object.keys(users).map(u => users[u]) ?? []
    setStaffList(mapUsersToStaff);
  };

  return (
    console.log("VIEW RENDERED"),
    <Box className="general-profile">
      <span className="icon is-medium is-pulled-right" onClick={refresh} onKeyPress={refresh}>
        <FontAwesomeIcon icon={faSync} size="lg" />
      </span>
      <h3 className="title is-3">
        People Directory
      </h3 >
      <hr className="separator" />
      <h3 className="title is-3"> All People </h3>
      <div className="columns">
        <ul>
          {staffList.map(userX => <UserResult firstName = {userX.firstName} lastName = {userX.lastName} profilePic = {userX.profilePic}/>)} 
        </ul>
      </div>
    </Box>
  );
}
