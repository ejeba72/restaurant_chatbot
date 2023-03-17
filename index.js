const { config } = require('dotenv');
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { mongoDB } = require('./src/database/connection');
const { SessionModel } = require('./src/models/session.model');
const { OrderModel } = require('./src/models/order.model');
const { CartModel } = require('./src/models/cart.model');
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
  print.info(`server message: user with socket id, ${socket.id}, has been connected`);

  io.emit('welcome msg', welcomeMsg);

  socket.on('disconnect', () => {
    print.info(`server message: user with socket id, ${socket.id}, has been disconnected`);
  })

  socket.on('client to server', (msg) => {
    print.info(`client message: ${msg}`);
    chatbotController(msg, socket.id, io);
  })
  
});

server.listen(PORT, () => {
  print.info('server is attentively listening @ 127.0.0.1:' + PORT)
})