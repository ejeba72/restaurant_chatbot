// PLEASE NOTE: This route is for development purpose only

const { Router } = require("express");

const { SessionModel } = require("../models/session.model");
const { print } = require("../print.helper");
const { OrderModel } = require("../models/order.model");
const { CartModel } = require("../models/cart.model");

const router = Router();

router.post('/test-db-connection', async (req, res) => {
  const payload = {
    toSessionsCollection: {
      sessionId: 'abadabidi',
      socketEvent: 'socket-event',
      message: 'testing the connection to mongoDB, as well as the session, order and cart models',
      msgDirection: 'anywhere belle face ;)'
    },
    toOrdersCollection: {
      sessionId: 'abadabidi',
      items:  ['biscuit', 'kuli-kuli', 'chin-chin', ':)']
    },
    toCartsCollection: {
      sessionId: 'abadabidi',
      items:  ['omo! see as person cart dey make another fellow man hungry! :)']
    }
  }

  const sessionDocument = new SessionModel(payload.toSessionsCollection);
  const orderDocument = new OrderModel(payload.toOrdersCollection);
  const cartDocument = new CartModel(payload.toCartsCollection);

  try {
    await sessionDocument.save();
    await orderDocument.save();
    await cartDocument.save();

    print.info('mongoDB connection test');
    res.status(201).send(payload);
  } catch (err) {
    print.error(err.message);
    res.status(500).send(err.message);
  }
}),

router.get('/sessions-collection', async (req, res) => {

  const sessionsCollection = await SessionModel.find();
  const payload = { sessionsCollection };

  try {
    print.info('mongoDB test(GET REQUEST): ' + payload);
    res.status(200).send(payload);
  } catch (err) {
    print.error(err.message);
    res.send(err.message);
  }
}),

router.get('/orders-collection', async (req, res) => {

  const ordersCollection = await OrderModel.find();
  const payload = { ordersCollection };

  try {
    print.info('mongoDB test(GET REQUEST): ' + payload);
    res.status(200).send(payload);
  } catch (err) {
    print.error(err.message);
    res.send(err.message);
  }
}),

router.get('/carts-collection', async (req, res) => {

  const cartsCollection = await CartModel.find()
  const payload = { cartsCollection };

  try {
    print.info('mongoDB test(GET REQUEST): ' + payload);
    res.status(200).send(payload);
  } catch (err) {
    print.error(err.message);
    res.send(err.message);
  }
})

module.exports = { devRoute: router }