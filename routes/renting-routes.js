const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

const rentingControllers = require('../controllers/renting-controllers');

const {
    getAllRentingController,
    postRentingController,
    getIDUsingUserParkIDController,
    getRentInfoUsingRentIDController,
    postUsedRentByRentIDController,
    getAllRentsByUserIDController,
    getUsedInfoCOntroller,
    postRentEndDateController
} = rentingControllers;

router.get('/', getAllRentingController);

router.post('/add', postRentingController);

router.post('/disabled', postUsedRentByRentIDController);

router.post('/info', getIDUsingUserParkIDController);

router.post('/rentinfo', getRentInfoUsingRentIDController);

router.post('/rentsbyuserid', getAllRentsByUserIDController);

router.post('/usedinfo', getUsedInfoCOntroller);

router.post('/exit', postRentEndDateController);

module.exports = router;