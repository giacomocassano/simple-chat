const {Errors} = require('../utils/error.utility');
const {Room} = require('./room');

class Lobby {
  /**
   * Creates a new lobby
   *
   * @param {Server} io - the socket server instance
   */
  constructor(io) {
    /**
     * @property {Server} io - the socket server instance
     */
    this.io = io;
    /**
     * @property {Object} room - the structure of rooms in the lobby
     * @property {Room} room[id] - the room associated with the lecture with a given id
     */
    this.rooms = {};
  }

  createRoom(roomObj) {
    const {uuid} = roomObj;
    //Check the lecture does not exist yet
    if (this.rooms[uuid]) throw Errors.roomAlreadyExists();

    //Create room and add to the structure
    const room = new Room(this.io, roomObj);
    this.rooms[uuid] = room;

    return room;
  }

  deleteRoom(uuid) {
    const room = this.rooms[uuid];

    //Check room exits
    if (!room) throw Errors.roomNotFound();
    //Check room is empty
    if (!room.isEmpty()) throw Errors.roomNotEmpty();

    //Delete room from rooms object
    delete this.rooms[uuid];
  }

  getRoomByUUID(uuid) {
    return this.rooms[uuid];
  }
}

module.exports = {Lobby};
