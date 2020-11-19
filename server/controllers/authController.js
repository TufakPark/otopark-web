const User = require("../models/User");
const jwt = require('jsonwebtoken');

// Handling Errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // TufakPark Error: INCORRECT EMAIL
    if (err.message === 'TPERR_ICEM') {
        errors.email = 'That email is not registered.';
    }

    // TufakPark Error: INCORRECT PASSWORD
    if (err.message === 'TPERR_ICPW') {
        errors.password = 'That password is incorrect.';
    }

    // Duplicate Email Errors
    if (err.code === 11000) {
        errors.email = 'That email is already registered.';
        return errors;
    }

    // Valdiation Errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

// Creating Json Web Token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
};

// Controller Actions
module.exports.signup_get = (req, res) => {
    res.json('This is signup page.');
}

module.exports.login_get = (req, res) => {
    res.json('This is login page.');
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}