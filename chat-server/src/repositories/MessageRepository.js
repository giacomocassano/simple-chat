const {Message} = require('../db/models');

const createMessage = async (room, {username, text}) => {
  return await Message.create({username, text, roomId: room.id});
};

const getMessagesByRoom = async (room) => {
  return await Message.findAll({where: {roomId: room.id}});
};

const updateMessage = async (message, {text}) => {
  return await message.update({text});
};

const deleteMessage = async (message) => {
  return await message.destroy();
};

module.exports = {createMessage, getMessagesByRoom, updateMessage, deleteMessage};
