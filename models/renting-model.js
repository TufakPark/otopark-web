const mongoose = require('mongoose');

const RentingSchema = mongoose.Schema({
  userid: { type: mongoose.Types.ObjectId, required: true },
  parkid: { type: mongoose.Types.ObjectId, required: true },
  date: { type: Date, default: Date.now, },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Renting', RentingSchema);