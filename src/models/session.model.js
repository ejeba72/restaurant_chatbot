const { Schema, model } = require('mongoose');

const sessionSchema = new Schema({
  sessionId: {
    type: String,
    required: true
  },
  socketEvent: String,
  message: String,
  msgDirection: String
})

const SessionModel = model('Session', sessionSchema);

module.exports = { SessionModel }