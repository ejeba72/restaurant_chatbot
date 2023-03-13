const { print } = require('./helpers/print');
const { config } = require('dotenv');
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { welcomeMsg, 
  restaurantMenu, 
  /*riceFlavour,*/ 
  showInfo, 
  meatList,
  checkout,
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
    // io.emit('eventName', data);
    // io.emit('server to client', msg);
    
    // const customer = {
    //   customerId: socket.id,
    //   customerOrder: []
    // }
    // const customerOrder = []

    if (msg === '0') {
      print.info(`customer with id, ${socket.id}, has cancelled order`)
      io.emit('server to client', `You have cancelled your order. Select 1 to place a new order`)

    } else if (msg === '1') {
      // const customerOrder = [];
      io.emit('server to client', restaurantMenu)

    } else if (msg === '2') {
      riceFlavour = 'Rice and Pepper Stew';
      customerOrder.push(riceFlavour);
      print.info(showInfo(riceFlavour, customerOrder, meatList));
      io.emit('server to client', meatList(riceFlavour))

    } else if (msg === '3') {
      riceFlavour = 'Jollof rice and Moi-moi';
      customerOrder.push(riceFlavour);
      print.info(showInfo(riceFlavour, customerOrder, meatList));
      io.emit('server to client', meatList(riceFlavour));

    } else if (msg === '4') {
      riceFlavour = 'Fried Rice and Salad';
      customerOrder.push(riceFlavour);
      print.info(showInfo(riceFlavour, customerOrder, meatList));
      io.emit('server to client', meatList(riceFlavour));

    } else if (msg === '5') {
      meatType = 'CatFish';
      customerOrder.push(meatType);
      print.info(showInfo(meatType, customerOrder, checkout));
      io.emit('server to client', checkout());

    } else if (msg === '6') {
      meatType = 'Chicken lap';
      customerOrder.push(meatType);
      print.info(showInfo(meatType, customerOrder, checkout));
      io.emit('server to client', checkout());
      
    } else if (msg === '7') {
      meatType = 'Goat meat';
      customerOrder.push(meatType);
      print.info(showInfo(meatType, customerOrder, checkout));
      io.emit('server to client', checkout());

    } else if (msg === '8') {
      meatType = 'Beef';
      customerOrder.push(meatType);
      print.info(showInfo(meatType, customerOrder, checkout));
      io.emit('server to client', checkout());

    } else if (msg === '9') {
      meatType = 'Assorted';
      customerOrder.push(meatType);
      print.info(showInfo(meatType, customerOrder, checkout));
      io.emit('server to client', checkout());

    } else if (msg === '10') {
      // customer doesn't want meat
      print.info(showInfo(meatType, customerOrder, checkout));
      io.emit('server to client', checkout());

    } else if (msg === '97') {
      // Select 97 to see current order: 
      // When a customer selects “97”, the bot should be able to return current order

    } else if (msg === '98') {
      // Order History: return all placed order
      // Select 98 to see order history:
      // When a customer selects “98”, the bot should be able to return all placed order

    } else if (msg === '99') {
      print.info(showInfo(meatType, customerOrder, orderPlaced));
      io.emit('server to client', orderPlaced(riceFlavour, meatType))
    } else {
      io.emit('server to client', 'Please enter a valid response');
    }
  })

  print.info(customerOrder);

});

server.listen(PORT, () => {
  print.info('server is attentively listening @ 127.0.0.1:' + PORT)
  // chatbotLogic();
})




















// const express = require('express');
// const { config } = require('dotenv');
// const { createServer } = require('http');
// const { print } = require('./helpers/print');

// config();
// const PORT = process.env.PORT;
// const app = express();
// const server = createServer(app);



// // app.get('/', (req, res) => {
// //   res.send({
// //     transformer: 'My name is Optimum Prime.'
// //   })
// // })

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// })

// server.listen(PORT, () => {
//   print.info('Server is attentively listening for requests @ 127.0.0.1:' + PORT + '.');
// })









// const express = require('express');
// const { config } = require('dotenv');
// const { createServer } = require('http');
// const { print } = require('./helpers/print');

// config();
// // const app = express();

// const PORT = process.env.PORT;

// const app = createServer((req, res) => {
//     res.end('Everwhere stew!')
//   })

// // const server = http.createServer((req, res) => {
// //   res.end('Everwhere stew!')
// // });

// // app.get('/', (req, res) => {
// //   try {
// //     print.info('response is successful')
// //     res.status(200).send({
// //       response: "helloOoo, world!!!"
// //     })
// //   } catch (err) {
// //     print.error('Mayday, mayday, we have a problem!');
// //     res.status(500).send('we have a problem');
// //   }
// // })

// app.listen(PORT, () => {
//   print.info('Server is attentively listening to request @ 127.0.0.1:' + PORT);
// })