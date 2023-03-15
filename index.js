const { print } = require('./helpers/print');
const { config } = require('dotenv');
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { 
  welcomeMsg, 
  restaurantMenu, 
  meatList,
  checkout,
  noMeat,
  orderPlaced,
} = require('./messages');

config();

const PORT = process.env.PORT;
const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

let riceFlavour, meatType;
const customerOrder = []


io.on('connection', (socket) => {

  print.info(`user with id, ${socket.id}, has been connected`);

  io.emit('welcome msg', welcomeMsg);

  socket.on('disconnect', () => {
    print.info(`user with id, ${socket.id}, has been disconnected`);
  })

  socket.on('client to server', (msg) => {
    print.info(`client message: ${msg}`);

    if (msg === '0') {
      print.info(`customer with id, ${socket.id}, has cancelled order`)
      io.emit('server to client', `You have cancelled your order. Select 1 to place a new order`)

    } else if (msg === '1') {
      io.emit('server to client', restaurantMenu)

    } else if (msg === '2') {
      riceFlavour = 'Rice and Pepper Stew';
      io.emit('server to client', meatList(riceFlavour))

    } else if (msg === '3') {
      riceFlavour = 'Jollof rice and Moi-moi';
      io.emit('server to client', meatList(riceFlavour));

    } else if (msg === '4') {
      riceFlavour = 'Fried Rice and Salad';
      io.emit('server to client', meatList(riceFlavour));

    } else if (msg === '5') {
      meatType = 'CatFish';
      io.emit('server to client', checkout(meatType));

    } else if (msg === '6') {
      meatType = 'Chicken lap';
      io.emit('server to client', checkout(meatType));
      
    } else if (msg === '7') {
      meatType = 'Goat meat';
      io.emit('server to client', checkout(meatType));

    } else if (msg === '8') {
      meatType = 'Beef';
      io.emit('server to client', checkout(meatType));

    } else if (msg === '9') {
      meatType = 'Assorted';
      io.emit('server to client', checkout(meatType));

    } else if (msg === '10') {
      // customer doesn't want meat
      io.emit('server to client', noMeat());

    } else if (msg === '97') {
      // Select 97 to see current order: 
      // When a customer selects “97”, the bot should be able to return current order

    } else if (msg === '98') {
      // Order History: return all placed order
      // Select 98 to see order history:
      // When a customer selects “98”, the bot should be able to return all placed order

    } else if (msg === '99') {
      io.emit('server to client', orderPlaced(riceFlavour, meatType))
      
    } else {
      io.emit('server to client', 'Please enter a valid response');
    }
  })
});

server.listen(PORT, () => {
  print.info('server is attentively listening @ 127.0.0.1:' + PORT)
})