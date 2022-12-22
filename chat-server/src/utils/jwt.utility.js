const {Errors} = require('./error.utility');
const {sign, verify} = require('jsonwebtoken');

/**
 * Generate a JWT token
 * @param {string} username - username
 * @returns {string} - JWT token
 */
const generateToken = (username, room) => {
  const accessToken = sign({username, room}, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.JWT_TOKEN_LIFE) * 1000,
  });

  return accessToken;
};

/**
 * Socket middleware to validate token
 * @param {Socket} socket - the socket instance
 * @param {Array<Object>} args - the arguments passed to the event
 * @param {Function} next - the next function to call
 */
const validateSocketToken = (socket, args, next) => {
  const token = socket.handshake.auth.token;

  if (!token) throw Errors.noAuthToken();

  verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) throw Errors.invalidAuthToken();

    socket.user = decoded;
    next();
  });
};

module.exports = {generateToken, validateSocketToken};
