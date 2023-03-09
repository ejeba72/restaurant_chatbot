const { config } = require('dotenv');
const http = require('http');
const { print } = require('./helpers/print');
const express = require('express');

config();

const PORT = process.env.PORT;

// const server = http.createServer((req, res) => {
//   res.end('Everwhere stew!')
// });

const app = express();

app.get('/', (req, res) => {
  try {
    print.info('response is successful')
    res.status(200).send({
      response: "helloOoo, world!!!"
    })
  } catch (err) {
    print.error('Mayday, mayday, we have a problem!');
    res.status(500).send('we have a problem');
  }
})

app.listen(PORT, () => {
  print.info('Server is attentively listening to request @ 127.0.0.1:' + PORT);
})