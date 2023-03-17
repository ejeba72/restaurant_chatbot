const { CartModel } = require("./models/cart.model");
const { OrderModel } = require("./models/order.model");
const { SessionModel } = require("./models/session.model");
const { print } = require("./print.helper");

module.exports = {
  saveChatMessage: async (sessionId, socketEvent, message, msgDirection) => {
    try {
      const data = new SessionModel({
        sessionId, 
        socketEvent, 
        message, 
        msgDirection,
      });
      await data.save();
      print.info(data);
    } catch (err) {
      print.error(err.message);
    }
  },

  fetchChatHistory: async (sessionId) => {
    try {
      return await SessionModel.find({sessionId});
    } catch (err) {
      print.error(err.message);
    }
  },

  saveItemInCart: async (sessionId, item) => {
    try {
      return await CartModel.updateOne({ sessionId }, { $push: { items: item }}, { upsert: true });
    } catch (err) {
      print.error(err.message);
    }
  },
  getCart: async (sessionId) => {
    try {
      return await CartModel.findOne({sessionId});
    } catch (err) {
      print.error(err.message);
    }
  },
  checkoutOrder: async (sessionId) => {
    try {
      const cart = await CartModel.findOneAndDelete({sessionId});
      await OrderModel.create({
        sessionId: cart.sessionId,
        items: cart.items,
      });
      return cart;
    } catch (err) {
      print.error(err.message);
    }
  },
  cancelOrder: async (sessionId) => {
    try {
      await CartModel.deleteOne({sessionId});
    } catch (err) {
      print.error(err.message);
    }
  },
  getOrderHistory: async (sessionId) => {
    try {
      return await OrderModel.find({sessionId});
    } catch (err) {
      print.error(err.message);
    }
  },
}