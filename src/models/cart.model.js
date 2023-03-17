const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  items: [String],
}, { timestamps: true});

const CartModel = model('Cart', cartSchema,);

module.exports = { CartModel }