const MessageRepository = require('../repositories/MessageRepository');
const RoomRepository = require('../repositories/RoomRepository');

//In the function no checks on room are performed since the room object is added by the server
//in the middleware function

const createMessage = async (room, {username, text}) => {
  //Truncate the text if it is too long
  if (text.length > 255) text = text.substring(0, 255);

  const newMessage = await MessageRepository.createMessage(room, {username, text});

  console.log(`${username} sent a message in ${room.name}: ${text}`);

  return newMessage;
};

const createRoom = async (name) => {
  //Truncate the name if it is too long
  if (name.length > 255) name = name.substring(0, 255);

  return await RoomRepository.createRoom(name);
};

const deleteMessage = async (username, uuid) => {
  const message = await MessageRepository.getMessageByUUID(uuid);

  if (!message) throw Errors.messageNotFound();

  if (message.username !== username) throw Errors.messageNotOwned();

  await MessageRepository.deleteMessage(message);

  console.log(`Message ${uuid} deleted`);

  return message;
};

const getMessagesByRoom = async (room) => {
  return await MessageRepository.getMessagesByRoom(room);
};

const updateMessage = async (uuid, username, {text}) => {
  const message = await MessageRepository.getMessageByUUID(uuid);

  if (!message) throw Errors.messageNotFound();

  if (message.username !== username) throw Errors.messageNotOwned();

  //Truncate the text if it is too long
  if (text.length > 255) text = text.substring(0, 255);

  await MessageRepository.updateMessage(message, {text});

  console.log(`Message ${uuid} updated`);

  return message;
};

module.exports = {createMessage, createRoom, deleteMessage, getMessagesByRoom, updateMessage};
