import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function UserResult({ firstName, lastName, profilePic, level, department }) {

  return (
    <div className="user-result">
      <figure className="image">
        <img
          className="profile-img"
          src={profilePic || '/images/default-profile.png'}
          alt="Profile"
        />
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