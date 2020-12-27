const mongoose = require('mongoose');

const RentingSchema = mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, required: true },
  parkid: { type: mongoose.Schema.Types.ObjectId, required: true },
  date: { type: Date, required: true, },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Renting', RentingSchema);