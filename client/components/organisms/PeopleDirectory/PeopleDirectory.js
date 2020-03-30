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
  const { user } = useSelector(R.pick(['user']));

  let { users } = useSelector(R.pick(['users']));

  const [firstName, setFirstName] = useState(user.firstName || 'start');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [bio, setBio] = useState(user.bio || '');
  const [profilePic, setProfilePic] = useState(user.profilePic || '');
  let userList = [user, user];

  const resetState = () => {
    setFirstName(user.firstName || 'TEST');
    setLastName(user.lastName || '');
    setBio(user.bio || '');
    setProfilePic(user.profilePic || '');
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
    console.log(users[0]);
    //figure out how to fill this userList with users
    userList = [user, user, user];
    setFirstName(users[0].firstName || 'TEST');
    setLastName(users[0].lastName || '');
  };

  return (
    console.log(users),
    console.log("USER LIST BELOW"),
    console.log(userList),
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
          {userList.map(userX => <UserResult firstName = {userX.firstName} lastName = {userX.lastName} profilePic = {user.profilePic}/>)} 
        </ul>
      </div>
    </Box>
  );
}
