const { config } = require('dotenv');
const crypto = require('crypto');
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { mongoDB } = require('./src/database/connection');
const { devRoute } = require('./src/routes/dev.route');
const { print } = require('./src/print.helper');
const { welcomeMsg } = require('./src/messages');
const chatbotController = require('./src/chatbot.controller');

config();
mongoDB();

const PORT = process.env.PORT;
const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use('/dev', devRoute);  // For development purpose only

io.on('connection', (socket) => {
  const sessionId = socket.handshake.query?.sessionId || crypto.randomUUID();
  print.info(`connection: user with session id, ${sessionId}, has been connected`);

  socket.emit('welcome-msg', welcomeMsg);

  socket.on('disconnect', () => {
    print.info(`disconnection: user with session id, ${sessionId}, has been disconnected`);
  })

  socket.on('client-to-server', (msgFromClient) => {
    print.info(`user input: ${msgFromClient}`);
    chatbotController(msgFromClient, sessionId, socket);
  })
  
});

server.listen(PORT, () => {
  print.info('server is attentively listening @ 127.0.0.1:' + PORT)
})