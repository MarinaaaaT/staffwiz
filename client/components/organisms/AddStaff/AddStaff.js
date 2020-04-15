import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import * as R from 'ramda';

import useKeyPress from '_hooks/useKeyPress';
import { postCheckUsername } from '_api/users';
import { validateUsername, validatePassword } from '_utils/validation';
import { attemptRegister } from '_thunks/auth';
import { attemptAddNewStaff } from '_thunks/users';

import Box from '_molecules/Box';
import Button from '_atoms/Button';

export default function Register() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [department, setDepartment] = useState('');
  const [level, setLevel] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');

  const checkPassword = (newUsername, newPassword) => {
    const { valid, message } = validatePassword(newUsername, newPassword);

    setPasswordValid(valid);
    setPasswordMessage(message);
  };

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
    } else {
      setUsernameAvailable(valid);
      setUsernameMessage(message);
    }
  };

  const updateUsername = newUserName => {
    setUsername(newUserName);
    checkPassword(newUserName, password);
  };

  const handleUsernameChange = e => {
    updateUsername(e.target.value);
    checkUsername(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
    checkPassword(username, e.target.value);
  };

  const handleDepartmentChange = e => {
    setDepartment(e.target.value);
  };

  const handleLevelChange = e => {
    setLevel(e.target.value);
  };

  const handleFirstNameChange = e => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = e => {
    setLastName(e.target.value);
  };

  const register = () => {
    if (usernameAvailable && passwordValid) {
      const newUser = {
        username,
        password,
      };

      dispatch(attemptRegister(newUser))
        .catch(R.identity);
    }
  };

  const addNewStaff = () => {
    if (usernameAvailable && passwordValid) {
      const newUser = {
        username,
        password,
        department, 
        level,
        last_name,
        first_name,
      };

      dispatch(attemptAddNewStaff(newUser))
        .catch(R.identity);
    }
  };

  useKeyPress('Enter', register);

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

  const passwordIconClasses = classNames({
    fa: true,
    'fa-check': passwordValid,
    'fa-warning': password && !passwordValid,
    'is-success': passwordValid,
    'is-danger': password && !passwordValid,
  });

  const passwordInputClasses = classNames({
    input: true,
    'is-success': passwordValid,
    'is-danger': password && !passwordValid,
  });

  const passwordHelpClasses = classNames({
    help: true,
    'is-success': passwordValid,
    'is-danger': password && !passwordValid,
  });

  return (
    <Box className="register">
      <h3 className="title is-3">
        Add New Staff Member
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
        <label htmlFor="password" className="label">
          Password
        </label>
        <p className="control has-icons-right">
          <input
            id="password"
            className={passwordInputClasses}
            placeholder="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <span className="icon is-small is-right">
            <i className={passwordIconClasses} />
          </span>
        </p>
        {password && (
          <p className={passwordHelpClasses}>
            {passwordMessage}
          </p>
        )}
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

      <hr className="separator" />

      <div className="has-text-right">
        <Button
          type="success"
          disabled={!passwordValid || !usernameAvailable}
          onClick={addNewStaff}
          label="Create Account"
        />
      </div>
    </Box>
  );
}
