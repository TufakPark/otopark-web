// ----- required libraries ----------------------
const express = require('express');
const cors    = require('cors');
const mongoose= require('mongoose');

// ----- required configs ------------------------
require('dotenv').config();

// ----- required variables ----------------------
const app = express();
const port= process.env.API_PORT || 5000;

// ----- required initializations ----------------
app.use(cors());
app.use(express.json());

// ----- database stuff --------------------------
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(process.env.MONGO_URI, options);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connection established successfully.');
})

// ----- required routes -------------------------

// login
const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

// register
const registerRouter = require('./routes/register');
app.use('/register', registerRouter);

// ----- checking server status ------------------
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});