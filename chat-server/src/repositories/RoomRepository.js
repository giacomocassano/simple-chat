const {Room} = require('../db/models');

const createRoom = async (name) => {
  return await Room.create({name});
};

const getRoomByUUID = async (uuid) => {
  return await Room.findOne({where: {uuid}});
};

module.exports = {createRoom, getRoomByUUID};
