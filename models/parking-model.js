const mongoose = require('mongoose');

const ParkingSchema = mongoose.Schema({
  userid: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    address: {
      type: String,
      required: true,
      unique: true
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
    // TODO: should we add renting's id to identify the process
    userid: { type: mongoose.Types.ObjectId },
    comment: { type: String },
    starwide: { type: Number },
    starsecurity: { type: Number },
  }]
});

module.exports = mongoose.model('Parking', ParkingSchema);