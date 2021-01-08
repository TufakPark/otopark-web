const Parking = require('../models/parking-model');

const { validationResult } = require('express-validator');

const getAllParkingController = async (req, res) => {
  try {
    const parks = await Parking.find();
    if (!parks) {
      return res.status(404).json({ message: 'Park bulunamadi' });
    }
    res.status(200).json({
      parks: parks.map((park) => park.toObject())
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postParkingController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.message }))

    return res.status(422).json({ message: 'Geçersiz Girdi', errors: extractedErrors });
  }

  try {
    const park = req.body;

    const isExist = await Parking.findOne({ location: park.location.address });
    if (isExist) {
      return res.status(422).json({ message: 'Park zaten mevcut' });
    }

    const newPark = new Parking(park);

    await newPark.save();

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getParkInfoByIdController = async (req, res) => {
  try {
    await Parking.findById({ _id: req.body.parkid })
      .exec()
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(404).json({ message: error });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllParkingController, postParkingController, getParkInfoByIdController };