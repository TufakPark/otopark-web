const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

const usersControllers = require('../controllers/users-controllers');

const auth = require('../middleware/auth');

const { getUsersController, signupController, loginController, tokenValidationController, getOneUserController, updateUserController } = usersControllers;

router.get('/', getUsersController);

router.post('/signup',
  [
    check('email')
      .not()
      .isEmpty(),
    check('password')
      .isLength({ min: 8 })
      .withMessage('Your password\'s length should have greater than 8'),
    check('passwordConfirmation').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm password does not match with the password you entered');
      }

      return true;
    })
  ],
  signupController);

router.post('/login', loginController);

router.get('/tokenvalid', tokenValidationController);

router.get('/getuser', auth, getOneUserController);

router.post('/update', auth, updateUserController);

module.exports = router;