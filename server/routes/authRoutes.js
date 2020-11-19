const router = require('express').Router();
const authController = require('../controllers/authController');

// Routes for sign up
router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);

// Routes for login
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

// Routes for logout
router.get('/logout', authController.logout_get);

module.exports = router;