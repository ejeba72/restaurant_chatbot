const pino = require('pino');
const pretty = require('pino-pretty');
const dayjs = require('dayjs');

const options = {
  base: {
    pid: false
  },
  timestamp: () => `,"time":"${dayjs().format('HHmm dddd D MMMM YYYY')}"`,
}

const stream = pretty()

const print = pino(options, stream);

module.exports =  print