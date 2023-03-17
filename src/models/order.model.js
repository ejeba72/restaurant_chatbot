const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  sessionId: {
    type: String,
    required: true
  },
  items: [String],
}, { timestamps: true});

const OrderModel = model('Order', orderSchema,);

module.exports = { OrderModel }