const router = require('express').Router();
let User = require('../models/user.model.js');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// TODO: Fill this with required fields
router.route('/add').post((req, res) => {  
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added into the database successfully.'))
    .catch(err => res.status(400).json('ERR: ' + err));
});

module.exports = router;