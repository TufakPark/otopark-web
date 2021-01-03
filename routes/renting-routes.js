const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

const rentingControllers = require('../controllers/renting-controllers');

const { getAllRentingController,
  postRentingController,
  getIDUsingUserParkIDController,
  getRentInfoUsingRentIDController,
  postUsedRentByRentIDController,
  getAllRentsByUserIDController } = rentingControllers;

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

router.post('/disabled', postUsedRentByRentIDController);

router.post('/info', getIDUsingUserParkIDController);

router.post('/rentinfo', getRentInfoUsingRentIDController);

router.post('/rentsbyuserid', getAllRentsByUserIDController);

module.exports = router;