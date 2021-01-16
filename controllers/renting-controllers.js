const mongoose = require('mongoose');

const Renting = require('../models/renting-model');
const Parking = require('../models/parking-model');

const { validationResult } = require('express-validator');

const getAllRentingController = async (req, res) => {
    try {
        const rents = await Renting.find();
        if (!rents) {
            return res.status(404).json({ message: 'Herhangi bir kiralama işlemi bulunamadı' });
        }
        res.status(200).json({
            rents: rents.map((rent) => rent.toObject())
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const postRentingController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const extractedErrors = []
        errors.array().map(err => extractedErrors.push({ [err.param]: err.message }))

        return res.status(422).json({ message: 'Geçersiz Girdi', errors: extractedErrors });
    }

    try {

        const isExist = await Renting.findOne({
            userid: req.body.userid,
            parkid: req.body.parkid
        });

        if (isExist && isExist.used !== true) {
            return res.status(422).json({ message: 'Kiralama işlemi zaten mevcut' });
        }

        const park = await Parking.findById({ _id: req.body.parkid });

        if (park.carsnumber >= park.capacity) {
            return res.status(500).json({ message: 'Otopark dolu' });
        }

        const newRent = new Renting(req.body);

        await newRent.save();

        Parking.findByIdAndUpdate(
            { _id: req.body.parkid },
            { $inc: { carsnumber: 1 } },
            { new: true })
            .exec()
            .then((response) => {
                res.status(200).json({
                    rent: newRent,
                    park: response
                });
            });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const postUsedRentByRentIDController = async (req, res) => {
    try {
        const id = req.body.id;

        await Renting.findByIdAndUpdate(
            { _id: id },
            {
                used: true
            },
            { new: true })
            .exec()
            .then((response) => {
                Parking.findByIdAndUpdate(
                    { _id: response.parkid },
                    { $inc: { carsnumber: -1 } },
                    { new: true })
                    .exec()
                    .then(() => {
                        res.status(200).json({
                            rent: response
                        });
                    });
            });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getIDUsingUserParkIDController = async (req, res) => {
    try {
        const ids = req.body;

        const exist = await Renting.find(ids);
        if (exist) {
            return res.status(200).json({ rents: exist.map((rent) => rent.toObject()) });
        } else {
            return res.status(404).json({ message: 'Bulunamadi' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getRentInfoUsingRentIDController = async (req, res) => {
    try {
        const id = req.body;

        const exist = await Renting.findById(id);
        if (exist) {
            return res.status(200).json({ rent: exist });
        } else {
            return res.status(404).json({ message: 'Bulunamadi' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllRentsByUserIDController = async (req, res) => {
    try {

        const exist = await Renting.find({ userid: req.body.userid });
        if (exist) {
            let rents = [];

            for (const rent of exist) {
                const park = await Parking.findById(rent.parkid).exec();
                rents.push({
                    rentinfo: rent,
                    parkinfo: park
                })
            }

            return res.status(200).json({ rents: rents });
        } else {
            return res.status(404).json({ message: 'Bulunamadi' });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getUsedInfoCOntroller = async (req, res) => {
    try {

        const exist = await Renting.findOne({ _id: req.body._id });
        if (exist.used) {
            return res.status(200).json(true);
        } else {
            return res.status(404).json(false);
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllRentingController,
    postRentingController,
    getIDUsingUserParkIDController,
    getRentInfoUsingRentIDController,
    postUsedRentByRentIDController,
    getAllRentsByUserIDController,
    getUsedInfoCOntroller
};