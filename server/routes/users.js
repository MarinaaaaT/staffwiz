const express = require('express');
const { User } = require('../database/schemas');
const { requireAuth, requireStaffingAuth } = require('./middleware');

const router   = express.Router();

module.exports = router;

router.post('/checkusername', (req, res) => {
  const username = req.body.username.toLowerCase();

  User.find({ username }, (err, users) => {
    if (err) {
      res.status(400).send({ message: 'Check username failed', err, username });
    }
    if (users && users[0]) {
      res.send({ available: false, message: 'Username exists', username });
    } else {
      res.send({ available: true, message: 'Username available', username });
    }
  });
});

router.post('/addNewStaff', requireStaffingAuth, (req, res) => {
  if (!req || !req.body || !req.body.username || !req.body.password || !req.body.level || !req.body.department) {
    res.status(400).send({ message: 'Username, Password, Department, and Level required' });
  }

  req.body.username_case = req.body.username;
  req.body.username = req.body.username.toLowerCase();

  const { username } = req.body;
  const newUser = User(req.body);
  newUser.isStaffing = false;

  User.find({ username }, (err, users) => {
    if (err) {
      res.status(400).send({ message: 'Create user failed', err });
    }
    if (users[0]) {
      res.status(400).send({ message: 'Username exists' });
    }

    newUser.hashPassword().then(() => {
      newUser.save((err, savedUser) => {
        if (err || !savedUser) {
          res.status(400).send({ message: 'Create user failed', err });
        } else {
          res.send({ message: 'User created successfully', user: savedUser.hidePassword() });
        }
      });
    });
  });
});

//TODO Update editStaffMember Function

router.put('/editStaffMember', requireStaffingAuth, (req, res) => {
  req.body.updated_at = Date.now();

  User.findByIdAndUpdate({ _id: req.user._id }, req.body, { new: true }, (err, user) => {
    if (err) {
      res.status(400).send({ err, message: 'Error updating user' });
    }
    res.status(200).send({ message: 'User successfully updated', user: user.hidePassword() });
  });
});

router.get('/', (req, res) => {

  User.find({}, (err, users) => {
    if (err) {
      res.status(400).send({ message: 'Get users failed', err });
    }
    else {
      res.status(200).send({ message: 'Success', users });
    }
  });
});
