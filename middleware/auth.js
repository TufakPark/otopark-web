const jwt = require('jsonwebtoken');

const { UP_JWT_SECRET } = require('../config');

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) {
      return res.status(401).json({ msg: "No authentication token, authorization denied" });
    }

    const verified = jwt.verify(token, UP_JWT_SECRET);
    if (!verified) {
      return res.status(401).json({ msg: "Token verification failed, authorization denied" });
    }

    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = auth;