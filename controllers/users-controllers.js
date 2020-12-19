const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');
const { UP_JWT_SECRET } = require('../config');

const User = require('../models/users-model');

const getUsersController = async (req, res) => {
  let users;

  try {
    users = await User.find({}, '-password');
  } catch (err) {
    return res.status(500).json({ msg: 'Could not find users' });
  }

  res.status(200).json({
    users: users.map((user) => user.toObject())
  });
};

const signupController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({ msg: 'Invalid inputs', errors: extractedErrors });
  }

  const { email, password, passwordConfirmation } = req.body;

  let isUserExist;

  try {
    isUserExist = await User.findOne({ email: email });
  } catch (err) {
    return res.status(500).json({ msg: 'Error occured while searching user' });
  }

  if (isUserExist) {
    return res.status(422).json({ msg: 'User already exists' });
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (err) {
    return res.status(500).json({ msg: 'Error occured while hashing password' });
  }

  const newUser = new User({
    email: email,
    password: hashedPassword
  });

  try {
    await newUser.save();
  } catch (err) {
    return res.status(500).json({ msg: 'Error occured while saving the new user' });
  }

  let token;

  try {
    token = jwt.sign({
      id: newUser.id
    },
      UP_JWT_SECRET,
      {
        expiresIn: 3600
      });
  } catch (err) {
    return res.status(500).json({ msg: 'Error occured while tokenization' });
  }

  res.status(200).json({
    token,
    user: {
      id: newUser.id,
      email: newUser.email
    }
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  let user;

  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    return res.status(422).json({ msg: 'Error occured while checking the email' });
  }

  if (!user) {
    return res.status(401).json({ msg: 'Could not identify the user, check your credentials' });
  }

  let isPasswordValid = false;

  try {
    isPasswordValid = await bcrypt.compare(password, user.password);
  } catch (err) {
    return res.status(500).json({ msg: 'Error occured while checking password' });
  }

  if (!isPasswordValid) {
    return res.status(403).json({ msg: 'Could not login, check your credentials' });
  }

  let token;

  try {
    token = jwt.sign({
      id: user.id,
      email: user.email
    },
      UP_JWT_SECRET,
      {
        expiresIn: 3600
      })
  } catch (err) {
    return res.status(500).json({ msg: 'Error occured while tokenization' });
  }

  res.status(200).json({
    token,
    user: {
      id: user.id,
      email: user.email
    }
  });
};

module.exports = { getUsersController, signupController, loginController };