import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import * as R from 'ramda';

import useKeyPress from '_hooks/useKeyPress';
import { postCheckUsername } from '_api/users';
import { validateUsername } from '_utils/validation';
import { attemptRegister } from '_thunks/auth';
import { attemptAddNewStaff } from '_thunks/users';

import Box from '_molecules/Box';
import Button from '_atoms/Button';
import { attemptEditUser } from '../../../store/thunks/users';

export default function EditStaff({staffMember}) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(staffMember.username);
  const [usernameMessage, setUsernameMessage] = useState('');
  const [department, setDepartment] = useState(staffMember.department);
  const [level, setLevel] = useState(staffMember.level);
  const [project, setProject] = useState(staffMember.project);
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [first_name, setFirstName] = useState(staffMember.firstName);
  const [last_name, setLastName] = useState(staffMember.lastName);
  const id = staffMember.Id;

  const checkUsername = newUsername => {
    const { valid, message } = validateUsername(newUsername);

    if (valid) {
      setUsernameMessage('Checking username...');
      setUsernameAvailable(false);

      postCheckUsername(newUsername)
        .then(res => {
          setUsernameAvailable(res.available);
          setUsernameMessage(res.message);
        })
        .catch(R.identity);

      if (newUsername == staffMember.username){
        setUsernameAvailable(true);
        setUsernameMessage("No change");
      }
    } 
    else {
      setUsernameAvailable(valid);
      setUsernameMessage(message);
    }
  };

  const updateUsername = newUserName => {
    setUsername(newUserName);
  };

  const handleUsernameChange = e => {
    updateUsername(e.target.value);
    checkUsername(e.target.value);
  };

  const handleDepartmentChange = e => {
    setDepartment(e.target.value);
  };

  const handleLevelChange = e => {
    setLevel(e.target.value);
    console.log(staffMember.Id);
  };

  const handleFirstNameChange = e => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = e => {
    setLastName(e.target.value);
  };

  const handleProjectChange = e => {
    setProject(e.target.value);
  };

  const editStaffMember = () => {
    var updatedUser = {};
    if (usernameAvailable) {
      updatedUser = {
        id,
        username,
        department, 
        level,
        last_name,
        first_name,
        project,
      };
    }

    dispatch(attemptEditUser(updatedUser))
      .catch(R.identity);
  };

  const usernameIconClasses = classNames({
    fa: true,
    'fa-check': usernameAvailable,
    'fa-warning': username && !usernameAvailable,
    'is-success': usernameAvailable,
    'is-danger': username && !usernameAvailable,
  });

  const usernameInputClasses = classNames({
    input: true,
    'is-success': usernameAvailable,
    'is-danger': username && !usernameAvailable,
  });

  const usernameHelpClasses = classNames({
    help: true,
    'is-success': usernameAvailable,
    'is-danger': username && !usernameAvailable,
  });

  return (
    <Box className="register">
      <h3 className="title is-3">
        Edit Staff Member
      </h3>
      <hr className="separator" />

      <div className="field">
        <label htmlFor="username" className="label">
          Username
        </label>
        <p className="control has-icons-right">
          <input
            id="username"
            className={usernameInputClasses}
            placeholder="Username"
            type="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <span className="icon is-small is-right">
            <i className={usernameIconClasses} />
          </span>
        </p>
        {username && (
          <p className={usernameHelpClasses}>
            {usernameMessage}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="first_name" className="label">
          First Name
        </label>
        <p className="control has-icons-right">
          <input
            id="first_name"
            className={usernameInputClasses}
            placeholder="First Name"
            type="first_name"
            value={first_name}
            onChange={handleFirstNameChange}
          />
          <span className="icon is-small is-right">
            <i className={usernameIconClasses} />
          </span>
        </p>
      </div>

      <div className="field">
        <label htmlFor="last_name" className="label">
          Last Name
        </label>
        <p className="control has-icons-right">
          <input
            id="last_name"
            className={usernameInputClasses}
            placeholder="Last Name"
            type="last_name"
            value={last_name}
            onChange={handleLastNameChange}
          />
        </p>
      </div>

      <div className="field">
        <label htmlFor="department" className="label">
          Department
        </label>
        <p className="control has-icons-right">
          <select id="department" name="department" onChange = {handleDepartmentChange}>
            <option value="Product Manager">Product Manager</option>
            <option value="Business Analyst">Business Analyst</option>
            <option value="Developer">Developer</option>
            <option value="Quality Analyst">Quality Analyst</option>
            <option value="Account Manager">Account Manager</option>
          </select>
        </p>
      </div>

      <div className="field">
        <label htmlFor="level" className="label">
          Level
        </label>
        <p className="control has-icons-right">
          <select id="level" name="level" onChange = {handleLevelChange}>
            <option value="Junior">Junior</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior">Senior</option>
            <option value="Director">Director</option>
            <option value="Lead">Lead</option>
          </select>
        </p>
      </div>

      <div className="field">
        <label htmlFor="project" className="label">
          Project
        </label>
        <p className="control has-icons-right">
          <select id="project" name="project" onChange = {handleProjectChange}>
            <option value="Hibbett Sports">Hibbett Sports</option>
            <option value="Scotts">Scotts</option>
            <option value="G6">G6</option>
          </select>
        </p>
      </div>

      <hr className="separator" />

      <div className="has-text-right">
        <Button
          type="success"
          disabled={!usernameAvailable}
          onClick={editStaffMember}
          label="Save Changes"
        />
      </div>
    </Box>
  );
}
