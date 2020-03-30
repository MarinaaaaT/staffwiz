import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from 'ramda';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import { attemptGetUsers } from '_thunks/users';
import Box from '_molecules/Box';

export default function PeopleDirectory() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(['user']));

  let { users } = useSelector(R.pick(['users']));

  const [firstName, setFirstName] = useState(user.firstName || 'start');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [bio, setBio] = useState(user.bio || '');
  const [profilePic, setProfilePic] = useState(user.profilePic || '');

  const resetState = () => {
    setFirstName(user.firstName || 'TEST');
    setLastName(user.lastName || '');
    setBio(user.bio || '');
    setProfilePic(user.profilePic || '');
  };

  const setUserList = () => {
    users = useSelector(R.pick(['users']));
  };

  useEffect(() => {
    dispatch(attemptGetUsers())
      .then(resetState)
      .catch(R.identity);
    resetState();
  }, []);

  const refresh = () => {
    console.log(userList + " REFRESH");
  };

  return (
    console.log(users),
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
        <div className="column is-2">
          <figure className="image">
            <img
              className="profile-img"
              src={profilePic || '/images/default-profile.png'}
              alt="Profile"
            />
          </figure>
          <p>
            Name: {firstName} {user.lastName}
          </p>
          <p>
            Department: Product Management
          </p>
          <p>
            Seniority: Senior
          </p>
          <p>
            Project: Hibbett
          </p>
        </div>
      </div>
    </Box>
  );
}
