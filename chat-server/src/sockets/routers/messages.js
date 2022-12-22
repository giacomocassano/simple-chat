const {Joi} = require('celebrate');
const {celebrateSocket} = require('../middlewares/middlewares');
const {v4: uuidv4} = require('uuid');
const ChatService = require('../../services/ChatService');

const router = require('socket.io-events')();

module.exports = (server) => {
  router.on(
    'chat:message',
    celebrateSocket({
      body: {
        message: Joi.string().required(),
      },
    }),
    async (socket, args, next) => {
      try {
        const {username, room} = socket.sock.data;
        const {message} = socket.body;

        const newMessage = await ChatService.createMessage(room, {
          username,
          text: message,
        });

        console.log(`New message from ${username} in ${room.name}: ${message}`);

        server.to(room.name).emit('chat:update', newMessage);
      } catch (err) {
        next(err);
      }
    }
  );

  router.on('*', (err, socket, args, next) => {
    server.errorHandling(err, socket, args, next);
    next();
  });

  return router;
};
