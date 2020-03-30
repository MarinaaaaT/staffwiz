import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function UserResult({ firstName, lastName, profilePic }) {

  return (
    <div className="column is-2">
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
        Department: Product Management
      </p>
      <p>
        Seniority: Senior
      </p>
      <p>
        Project: Hibbett
      </p>
    </div>
  );
}