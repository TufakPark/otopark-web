const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  name: {
    type: String,
  },
  phonenumber: {
    type: String
  },
  registerdate: {
    type: Date,
    default: Date.now
  },
  balance: {
    type: Number
  }
});

module.exports = mongoose.model('User', UserSchema);