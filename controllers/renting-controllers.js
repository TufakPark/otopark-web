const Renting = require('../models/renting-model');

const { validationResult } = require('express-validator');

const getAllRentingController = async (req, res) => {
  try {
    const rents = await Renting.find();
    if (!rents) {
      return res.status(404).json({ msg: 'Herhangi bir kiralama işlemi bulunamadı' });
    }
    res.status(200).json({
      rents: rents.map((rent) => rent.toObject())
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const postRentingController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({ msg: 'Geçersiz Girdi', errors: extractedErrors });
  }

  try {
    const rent = req.body;

    const isExist = await Renting.findOne(rent);
    if (isExist) {
      return res.status(422).json({ msg: 'Kiralama işlemi zaten mevcut' });
    }

    const newRent = new Renting(rent);

    await newRent.save();

    res.status(200).json(newRent);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getIDUsingUserParkIDController = async (req, res) => {
  try {
    const ids = req.body;

    const exist = await Renting.find(ids);
    if (exist) {
      return res.status(200).json({ rents: exist.map((rent) => rent.toObject()) });
    } else {
      return res.status(404).json({ msg: 'Bulunamadi' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRentInfoUsingRentIDController = async (req, res) => {
  try {
    const id = req.body;

    const exist = await Renting.findById(id);
    if (exist) {
      return res.status(200).json({ rent: exist });
    } else {
      return res.status(404).json({ msg: 'Bulunamadi' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllRentingController, postRentingController, getIDUsingUserParkIDController, getRentInfoUsingRentIDController };