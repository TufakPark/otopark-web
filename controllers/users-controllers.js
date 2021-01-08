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
    return res.status(500).json({ message: 'Kullanıcı Bulunamadı' });
  }

  res.status(200).json({
    users: users.map((user) => user.toObject())
  });
};

const signupController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.message }))

    return res.status(422).json({ message: 'Geçersiz Girdi', errors: extractedErrors });
  }

  const { email, password, passwordConfirmation } = req.body;

  let isUserExist;

  try {
    isUserExist = await User.findOne({ email: email });
  } catch (err) {
    return res.status(500).json({ message: '<Kullanıcı mevcut mu?> sırasında hata meydana geldi' });
  }

  if (isUserExist) {
    return res.status(422).json({ message: 'Kullanıcı zaten var' });
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (err) {
    return res.status(500).json({ message: '<Şifre oluşturma> sırasında hata meydana geldi' });
  }

  const newUser = new User({
    email: email,
    password: hashedPassword
  });

  try {
    await newUser.save();
  } catch (err) {
    return res.status(500).json({ message: '<Kullanıcı kaydet> sırasında hata meydana geldi' });
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
    return res.status(500).json({ message: '<Token oluşturma> sırasında hata meydana geldi' });
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
    return res.status(422).json({ message: '<Kullanıcı mevcut mu?> sırasında hata meydana geldi' });
  }

  if (!user) {
    return res.status(401).json({ message: 'Mevcut kullanıcı bulunamadı. Girdilerinizi kontrol ediniz' });
  }

  let isPasswordValid = false;

  try {
    isPasswordValid = await bcrypt.compare(password, user.password);
  } catch (err) {
    return res.status(500).json({ message: '<Şifre karşılaştırma> sırasında hata meydana geldi' });
  }

  if (!isPasswordValid) {
    return res.status(403).json({ message: 'Mevcut kullanıcı bulunamadı. Girdilerinizi kontrol ediniz' });
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
    return res.status(500).json({ message: '<Token oluşturma> sırasında hata meydana geldi' });
  }

  res.status(200).json({
    token,
    user: {
      id: user.id,
      email: user.email
    }
  });
};

const tokenValidationController = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, UP_JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.status(200).json(true);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOneUserController = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    return res.status(200).json({
      id: user._id,
      email: user.email,
      name: user.name,
      places: user.places,
      registerdate: user.registerdate
    })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUserController = async (req, res) => {

  // TODO: check body if its empty

  if (req.body.password !== req.body.passwordConfirmation) {
    res.status(400).json({ message: 'Parolaları aynı giriniz' });
  }

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  } catch (err) {
    return res.status(500).json({ message: '<Şifre oluşturma> sırasında hata meydana geldi' });
  }

  User.findByIdAndUpdate(req.user, req.body, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
      }

      return res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    })
    .catch((err) => {
      return res.status(500).json({ message: '<Kullanıcı güncelleştirme> sırasında hata meydana geldi' });
    });
};

const postFavouriteParkUserController = async (req, res) => {
  await User.findByIdAndUpdate({ _id: req.user }, {
    $push: { favourites: req.body.parkid }
  }, { new: true })
    .then(() => {
      return res.status(200).json({ message: 'Favorilere eklendi' });
    })
    .catch((error) => {
      return res.status(500).json({ message: error });
    });
};

const getAllFavouritesParkUserController = async (req, res) => {
  await User.findById({ _id: req.user }).then((user) => {
    console.log(user.favourites);
    res.status(200).json({
      parks: user.favourites
    })
  })
    .catch((error) => {
      return res.status(500).json({ message: error });
    })
};

module.exports = {
  getUsersController,
  signupController,
  loginController,
  tokenValidationController,
  getOneUserController,
  updateUserController,
  postFavouriteParkUserController,
  getAllFavouritesParkUserController
};