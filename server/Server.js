// ----- required libraries ----------------------
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

// ----- required configs ------------------------
require('dotenv').config();

// ----- required variables ----------------------
const app = express();
const port = process.env.API_PORT || 5000;

// ----- required initializations ----------------
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// ----- database connection ---------------------
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

mongoose.connect(process.env.MONGO_URI, options)
    .then((result) => app.listen(port))
    .catch((err) => console.log(err));

// ----- required routes -------------------------

// home
app.get('*', checkUser);


app.get('/', (req, res) => {
    res.json('This is home page.');
});

app.use(authRoutes);