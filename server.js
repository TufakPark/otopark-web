// Importing environment variables from config.env
const { UP_API_PORT, UP_DB_CONN } = require('./config');

// Import ...
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importing routes
const usersRoutes = require('./routes/users-routes');
const parksRoutes = require('./routes/parking-routes');
const rentsRoutes = require('./routes/renting-routes');

const app = express();

app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PATCH, DELETE'
//   );
//   next();
// });

// Users Routes
app.use('/api/users', usersRoutes);
app.use('/api/parks', parksRoutes);
app.use('/api/rents', rentsRoutes);

// Unknown Route
app.use((req, res) => {
  res.status(404).json({ msg: 'Could not find this route' });
});

// DB Connection and listening . . .
mongoose
  .connect(UP_DB_CONN, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    app.listen(UP_API_PORT, () => {
      console.log(`Database connection is established. Server is running on port '${UP_API_PORT}'`);
    });
  })
  .catch((err) => {
    console.log(`Error occured while connecting database and server could not start\n\n${err}`);
  });