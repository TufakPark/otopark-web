const mongoose = require('mongoose');

const ParkingSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        latlng: {
            latitude: { type: Number },
            longitude: { type: Number },
        }
    },
    capacity: {
        type: Number,
        required: true
    },
    cartype: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    carsnumber: {
        type: Number,
        required: true
    },
    subscription: {
        type: Number,
        required: true
    },
    availabletimes: [{
        _id: false,
        day: { type: String, required: true },
        times: { type: [String, String], required: true }
    }],
    comments: [{
        userid: { type: mongoose.Schema.Types.ObjectId },
        rentingid: { type: mongoose.Schema.Types.ObjectId },
        comment: { type: String },
        starwide: { type: Number },
        starsecurity: { type: Number },
    }]
});

module.exports = mongoose.model('Parking', ParkingSchema);