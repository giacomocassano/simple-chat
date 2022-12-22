const {createServer} = require('http');
const {initSocketServer} = require('./sockets/server');
const {sequelize} = require('./db/models');
require('dotenv').config();

const server = createServer();

initSocketServer(server);

sequelize
  .sync()
  .then(() => {
    console.log('Database connected');
    server.listen(5000, () => {
      console.log('listening on *:5000');
    });
  })
  .catch((err) => {
    console.log(err);
  });
