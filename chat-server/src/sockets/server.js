const {Lobby} = require('./lobby');
const {authorizeConnection} = require('./middlewares/middlewares');
const {Server} = require('socket.io');
const {Errors} = require('../utils/error.utility');
const ChatService = require('../services/ChatService');

const initSocketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  const lobby = new Lobby(io);

  io.use(authorizeConnection);
  io.use(require('./routers/messages')(io));
  io.use(io.errorHandling);

  io.on('connection', async (socket) => {
    try {
      const {room, roomName, action, username} = socket.data;

      //Find the room or create it if it does not exist
      if (action === 'join') {
        let roomInstance = lobby.getRoomByUUID(room.uuid);
        //Check that the room exists
        if (!roomInstance) {
          socket.emit('error', Errors.roomNotFound());
          socket.disconnect();
        } else {
          //Check if the user is already in the room
          const members = await roomInstance.getMembers();
          if (members.includes(username)) throw Errors.userAlreadyInRoom();
          //Ok, join the room
          socket.join(room.name);
          console.log(`${username} joined ${room.name}`);
          //Send the room info to the client
          const info = {
            room,
            participants: await roomInstance.getMembers(),
            messages: await ChatService.getMessagesByRoom(room),
          };
          socket.emit('connection:authorized', info);
        }
      } else if (action === 'create') {
        //Create the room
        const roomObj = await ChatService.createRoom(roomName);
        //Add room to the socket data
        socket.data.room = roomObj;
        //Create the room in the lobby
        roomInstance = lobby.createRoom(roomObj);
        socket.join(roomName);
        console.log(`${username} created ${roomObj.name}`);
        //Send the room info to the client
        const info = {
          room: roomObj,
          participants: await roomInstance.getMembers(),
          messages: await ChatService.getMessagesByRoom(roomObj),
        };
        socket.emit('connection:authorized', info);
      }
    } catch (err) {
      console.log(err);
    }

    socket.on('disconnect', async (reason) => {
      try {
        const {room, username} = socket.data;
        if (!room || !username) throw Errors.noQuery();

        //Find the room
        const roomInstance = lobby.getRoomByUUID(room);
        if (roomInstance && (await roomInstance.isEmpty())) {
          lobby.deleteRoom(room);
          console.log(`${room} deleted`);
        }
        console.log(`${username} left ${room.name} for reason: ${reason}`);
      } catch (err) {
        console.log(err);
      }
    });
  });

  /**
   * Error handling routine
   * @param {Object} err - the error
   * @param {string} err.status - always "error"
   * @param {string[]} err.description - the error description
   * @param {string} err.code - the error code
   * @param {Socket} socket - the socket where the error should be emitted
   */
  io.errorHandling = function (err, socket, args, next) {
    Errors.printError(err);
    socket.emit('error', err);
    next();
  };

  return io;
};

module.exports = {initSocketServer};
