const Parking = require('../models/parking-model');

const { validationResult } = require('express-validator');

const getAllParkingController = async (req, res) => {
  try {
    const parks = await Parking.find();
    if (!parks) {
      return res.status(404).json({ msg: 'Park bulunamadi' });
    }
    res.status(200).json({
      parks: parks.map((park) => park.toObject())
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const postParkingController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({ msg: 'Geçersiz Girdi', errors: extractedErrors });
  }

  try {
    const park = req.body;

    const isExist = await Parking.findOne({ location: park.location.address });
    if (isExist) {
      return res.status(422).json({ msg: 'Park zaten mevcut' });
    }

    const newPark = new Parking(park);

    await newPark.save();

    res.status(200).json(newPark);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllParkingController, postParkingController };