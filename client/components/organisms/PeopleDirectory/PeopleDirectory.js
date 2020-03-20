import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from 'ramda';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import { validateName } from '_utils/validation';
import { attemptGetUser, attemptUpdateUser } from '_thunks/user';
import { attemptGetUsers } from '_thunks/users';
import Box from '_molecules/Box';

export default function PeopleDirectory() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(['user']));
  const { allUsers } = useSelector(R.pick(['users']));

  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [bio, setBio] = useState(user.bio || '');
  const [profilePic, setProfilePic] = useState(user.profilePic || '');

  let users = [user, user];

  const resetState = () => {
    setFirstName(user.firstName || '');
    setLastName(user.lastName || '');
    setBio(user.bio || '');
    setProfilePic(user.profilePic || '');
  };

  useEffect(() => {
    resetState();
  }, [user.firstName, user.lastName, user.bio, user.profilePic]);

  const refresh = () => dispatch(attemptGetUsers())
    .then(resetState)
    .catch(R.identity);

  return (
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
            Name: {users[1].firstName} {user.lastName}
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
