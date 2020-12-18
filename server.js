require('dotenv').config({ path: './config/.env' });

const express = require('express');
const cors    = require('cors');
const mongoose= require('mongoose');

// Routes
import userRoutes from './routes/api/v1/users';
import authRoutes from './routes/api/v1/auth';

// Getting API Port
const UFAKPARK_API_PORT = process.env.UFAKPARK_API_PORT || 5000;

const app = express();

// CORS Middleware
app.use(cors());

// Parser
app.use(express.json());

// Getting MongoDB Conenction String
const UFAKPARK_MONGO_CONN = process.env.UFAKPARK_MONGO_CONN;

// Setting MongoDB Connection Options
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};

// Connecting MongoDB 
mongoose.connect(UFAKPARK_MONGO_CONN, options)
        .then(function(){
            console.log(`Database connection is established.`);
        })
        .catch(function(err) {
            console.log(err);
        });

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);

// Listening on port=?
app.listen(UFAKPARK_API_PORT, function() {
    console.log(`Server started on port ${UFAKPARK_API_PORT}`);
});