import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';

export default function UserResult({ firstName, lastName, profilePic, level, department, user }) {

  const dispatch = useDispatch();

  const editStaff = () => {
    dispatch(push('/staff/editstaff', {"staffMember" : user}));
  }


//TODO get this info from user instead of each individual attribute (like level, dept, ln, fn)
  return (
    <div className="user-result">
      <figure className="image">
        <img
          className="profile-img"
          src={profilePic || '/images/default-profile.png'}
          alt="Profile"
        />
        <span className="icon is-medium is-pulled-right" >
          <FontAwesomeIcon icon={faEdit} size="lg" onClick={editStaff} onKeyPress={editStaff}/>
        </span> 
      </figure>
      <p>
        Name: {firstName} {lastName}
      </p>
      <p>
        Department: {department}
      </p>
      <p>
        Seniority: {level}
      </p>
      <p>
        Project: Hibbett
      </p>
    </div>
  );
}