const { config } = require('dotenv');
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { welcomeMsg, restaurantMenu } = require('./messages');
const { print } = require('./helpers/print');

config();

const PORT = process.env.PORT;
const app = express();
const server = createServer(app);
const io = new Server(server);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})


io.on('connection', (socket) => {

  print.info(`user with id, ${socket.id}, has been connected`);

  io.emit('welcome msg', welcomeMsg);

  socket.on('disconnect', () => {
    print.info(`user with id, ${socket.id}, has been disconnected`);
  })

  socket.on('client to server', (msg) => {
    print.info(`client message: ${msg}`);
    // io.emit('server to client', msg); // io.emit('eventName', data);
    if (1) {
      const customerOrder = [];
      io.emit('server to client', restaurantMenu)
    }
    if (2) {
      io.emit()
    }
  })

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