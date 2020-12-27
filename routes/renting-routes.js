const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

const rentingControllers = require('../controllers/renting-controllers');

const { getAllRentingController, postRentingController, getIDUsingUserParkIDController } = rentingControllers;

router.get('/', getAllRentingController);

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
  postRentingController);

router.post('/info', getIDUsingUserParkIDController);

module.exports = router;