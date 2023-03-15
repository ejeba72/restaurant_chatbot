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

const logger = pino(options, stream);

const print = {
  info: (data) => {
    if (!process.env.DEBUG) return;
    logger.info(data);
  },
  error: (data) => {
    if (!process.env.DEBUG) return;
    logger.error(data);
  }
}

module.exports = { print }