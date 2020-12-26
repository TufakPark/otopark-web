const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

const rentingControllers = require('../controllers/renting-controllers');

const { getAllRentingController, postRentingController } = rentingControllers;

const auth = require('../middleware/auth');

router.get('/', auth, getAllRentingController);

router.post('/add',
  [
    check('userid')
      .not()
      .isEmpty(),
    check('parkid')
      .not()
      .isEmpty(),
    check('price')
      .not()
      .isEmpty()
  ],
  auth,
  postRentingController);

module.exports = router;