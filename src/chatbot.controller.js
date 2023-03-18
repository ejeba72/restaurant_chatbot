const { print } = require('./print.helper');
const { MEAT, RICE } = require('./constants');
const {
  restaurantMenu, 
  meatList,
  checkout,
  noMeat, 
  orderPlaced, 
  viewCurrentOrder,
  viewOrderHistory
} = require('./messages');
const { 
  cancelOrder, 
  saveItemInCart, 
  getCart, 
  getOrderHistory, 
  checkoutOrder 
} = require('./db.handler');

module.exports = async (msgFromClient, sessionId, emitter) => {
  const socketEvent = 'server-to-client';
  switch (msgFromClient) {
    case '0':
      cancelOrder(sessionId);
      print.info(`msgFrmServer: customer with session id, ${sessionId}, has cancelled order`);
      emitter({
        socketEvent,
        sessionId,
        msgToClient: `You have cancelled your order. Select 1 to place a new order`
      })
      break;

    case '1':
      emitter({
        socketEvent,
        sessionId,
        msgToClient: restaurantMenu
      })
      break;

    case '2':
      saveItemInCart(sessionId, RICE.pepperRice);
      emitter({
        socketEvent,
        sessionId,
        msgToClient: meatList(RICE.pepperRice)
      })
      break;

    case '3':
      await saveItemInCart(sessionId, RICE.jollofRice);
      emitter({
        socketEvent,
        sessionId,
        msgToClient: meatList(RICE.jollofRice)
      })
      break;

    case '4':
      await saveItemInCart(sessionId, RICE.friedRice);
      emitter({
        socketEvent,
        sessionId,
        msgToClient: meatList(RICE.friedRice)
      })
      break;

    case '5':
      await saveItemInCart(sessionId, MEAT.catfish);
      emitter({
        socketEvent,
        sessionId,
        msgToClient: checkout(MEAT.catfish)
      })
      break;

    case '6':
      await saveItemInCart(sessionId, MEAT.chicken);
      emitter({
        socketEvent,
        sessionId,
        msgToClient: checkout(MEAT.chicken)
      })
      break;
    
    case '7':
      await saveItemInCart(sessionId, MEAT.goat);
      emitter({
        socketEvent,
        sessionId,
        msgToClient: checkout(MEAT.goat)
      })
      break;

    case '8':
      await saveItemInCart(sessionId, MEAT.beef);
      emitter({
        socketEvent,
        sessionId,
        msgToClient: checkout(MEAT.beef)
      })
      break;

    case '9':
      await saveItemInCart(sessionId, MEAT.assorted);
      emitter({
        socketEvent,
        sessionId,
        msgToClient: checkout(MEAT.assorted)
      })
      break;

    case '10':
      // customer doesn't want meat
      emitter({
        socketEvent,
        sessionId,
        msgToClient: noMeat()
      })
      break;

    case '97':
      const cart = await getCart(sessionId);
      emitter({
        socketEvent,
        sessionId,
        msgToClient: viewCurrentOrder(cart)
      })
      break;

    case '98':
      const orderHistory = await getOrderHistory(sessionId);
      emitter({
        socketEvent,
        sessionId,
        msgToClient: viewOrderHistory(orderHistory)
      })
    break;

    case '99':
      const order = await checkoutOrder(sessionId);
      emitter({
        socketEvent,
        sessionId,
        msgToClient: orderPlaced(order)
      })
      break;

    case '000':
      emitter({
        socketEvent: 'start-new-session',
        sessionId,
        msgToClient: 'Starting new session'
      });
    
    default:
      emitter({
        socketEvent,
        sessionId,
        msgToClient: 'Please enter a valid response'
      })
      break;

  }
}