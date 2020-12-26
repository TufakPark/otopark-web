const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

const parkingControllers = require('../controllers/parking-controllers');

const { getAllParkingController, postParkingController } = parkingControllers;

const auth = require('../middleware/auth');

router.get('/', auth, getAllParkingController);

router.post('/add',
  [
    check('userid')
      .not()
      .isEmpty(),
    check('name')
      .not()
      .isEmpty(),
    check('location')
      .not()
      .isEmpty(),
    check('capacity')
      .not()
      .isEmpty(),
    check('cartype')
      .not()
      .isEmpty(),
    check('price')
      .not()
      .isEmpty(),
    check('carsnumber')
      .not()
      .isEmpty(),
    check('subscription')
      .not()
      .isEmpty(),
    check('availabletimes')
      .not()
      .isEmpty(),
  ],
  auth,
  postParkingController);

module.exports = router;