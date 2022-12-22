class Room {
  constructor(io, room) {
    this.io = io;
    this.room = room;
  }

  async getMembers() {
    const sockets = await this.io.in(this.room.name).fetchSockets();
    return sockets.map((s) => s.data.username);
  }

  async isEmpty() {
    const connectedSockets = await this.io.in(this.room.name).fetchSockets();
    return connectedSockets.length === 0;
  }
}

module.exports = {Room};
