const jwt = require("jsonwebtoken");

exports.createToken = (payload, secret, expireTime) => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

exports.verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};
