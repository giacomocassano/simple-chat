const {Errors} = require('../../utils/error.utility');
const {celebrate} = require('celebrate');
const RoomRepository = require('../../repositories/RoomRepository');

/**
 * Socket middleware to validate token
 * @param {Socket} socket - the socket instance
 * @param {Array<Object>} args - the arguments passed to the event
 * @param {Function} next - the next function to call
 */
const authorizeConnection = async (socket, next) => {
  const {roomName, roomUUID, action, username} = socket.handshake.query;

  if (!action || !username) next(Errors.noQuery());
  if (action === 'create' && !roomName) next(Errors.noQuery());
  if (action === 'join' && !roomUUID) next(Errors.noQuery());

  //Find the room uuid
  if (roomUUID) {
    const room = await RoomRepository.getRoomByUUID(roomUUID);
    if (!room) return next(Errors.roomNotFound());
    socket.data.room = room;
  } else {
    socket.data.roomName = roomName;
  }

  socket.data.username = username;
  socket.data.action = action;

  next();
};

const celebrateSocket = (validationObject) => {
  return async (socket, args, next) => {
    const body = args[1] || {};

    try {
      await celebrate(validationObject)({
        method: 'WS',
        body: body,
      });

      socket.body = body;

      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = {authorizeConnection, celebrateSocket};
