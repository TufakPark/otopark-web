const mongoose = require('mongoose');

const RentingSchema = mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, required: true },
  parkid: { type: mongoose.Schema.Types.ObjectId, required: true },
  startdate: { type: Date, required: true, },
  enddate: { type: Date, required: true, },
  used: { type: Boolean, default: false, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Renting', RentingSchema);