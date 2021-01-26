const mongoose = require('mongoose');

const RentingSchema = mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, required: true },
    parkid: { type: mongoose.Schema.Types.ObjectId, required: true },
    startdate: { type: Date },
    enddate: { type: Date },
    used: { type: Boolean, default: false, },
    price: { type: Number }
});

module.exports = mongoose.model('Renting', RentingSchema);