require('dotenv').config();

const express   = require('express')
const app       = express()

app.get('/', (req, res) => {
  res.send('Tufak Park')
})

app.listen(process.env.API_PORT, () => {
  console.log(`Listening at http://localhost:${process.env.API_PORT}`)
})