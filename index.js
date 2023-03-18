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
const { saveChatMessage, fetchChatHistory } = require('./src/db.handler');

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

io.on('connection', async (socket) => {

  const emitter = async ({ sessionId, msgToClient, socketEvent, shouldSave=true }) => {
    if (shouldSave) {
      await saveChatMessage(sessionId, socketEvent, msgToClient, 'outgoing');
    }
    print.info('server has emitted data to the client')
    socket.emit(socketEvent, {
      sessionId,
      msgFromServer: msgToClient
    });
  };

  const sessionId = socket.handshake.query?.sessionId || crypto.randomUUID();
  print.info(`status: user with session id, ${sessionId}, has been connected`);

  if (socket.handshake.query?.sessionId) {
    try {
      const msgHistory = await fetchChatHistory(sessionId);
      msgHistory.forEach(item => {
        emitter({sessionId, socketEvent: item.socketEvent, msgToClient: item.message, shouldSave: false});
      });
      print.info(msgHistory);
    } catch (err) {
      print.error(err.message);
    }
  }
  else {
    emitter({sessionId, msgToClient: welcomeMsg, socketEvent: 'welcome-msg', shouldSave: true});
  }

  socket.on('disconnect', () => {
    print.info(`status: user with session id, ${sessionId}, has been disconnected`);
  })

  socket.on('client-to-server', async (msgFromClient) => {
    print.info(`user input: ${msgFromClient}`);
    await saveChatMessage(sessionId, 'client-to-server', msgFromClient, 'incoming');
    chatbotController(msgFromClient, sessionId, emitter);
  })
  
});

server.listen(PORT, () => {
  print.info('server is attentively listening @ 127.0.0.1:' + PORT)
})