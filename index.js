const { config } = require('dotenv');
const http = require('http');
const { print } = require('./helpers/print');

config();

const hostname = '127.0.0.1';
const PORT = process.env.PORT;

print.info(PORT);

const server = http.createServer((req, res) => {
  res.end('Everwhere stew!')
});

server.listen(PORT, hostname, () => {
  print.info('Server is attentively listening to request @ ' + hostname + ':' + PORT);
})