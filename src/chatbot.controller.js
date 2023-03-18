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
      // socket.emit('server-to-client', `You have cancelled your order. Select 1 to place a new order`);
      emitter({
        socketEvent,
        sessionId,
        msgToClient: `You have cancelled your order. Select 1 to place a new order`
      })
      break;

    case '1':
      // socket.emit('server-to-client', restaurantMenu);
      emitter({
        socketEvent,
        sessionId,
        msgToClient: restaurantMenu
      })
      // emitter({
      //   msgToClient: restaurantMenu,
      //   socketEvent
      // })
      break;

    case '2':
      // socket.emit('server-to-client', meatList(RICE.pepperRice));
      saveItemInCart(sessionId, RICE.pepperRice);
      emitter({
        socketEvent,
        sessionId,
        msgToClient: meatList(RICE.pepperRice)
      })
      break;

    case '3':
      // socket.emit('server-to-client', meatList(RICE.jollofRice));
      await saveItemInCart(sessionId, RICE.jollofRice);
      emitter({
        socketEvent,
        sessionId,
        msgToClient: meatList(RICE.jollofRice)
      })
      break;

    case '4':
      // socket.emit('server-to-client', meatList(RICE.friedRice));
      await saveItemInCart(sessionId, RICE.friedRice);
      emitter({
        socketEvent,
        sessionId,
        msgToClient: meatList(RICE.friedRice)
      })
      break;

    case '5':
      // socket.emit('server-to-client', checkout(MEAT.catfish));
      await saveItemInCart(sessionId, MEAT.catfish);
      emitter({
        socketEvent,
        sessionId,
        msgToClient: checkout(MEAT.catfish)
      })
      break;

    case '6':
      // socket.emit('server-to-client', checkout(MEAT.chicken));
      await saveItemInCart(sessionId, MEAT.chicken);
      emitter({
        socketEvent,
        sessionId,
        msgToClient: checkout(MEAT.chicken)
      })
      break;
    
    case '7':
      // socket.emit('server-to-client', checkout(MEAT.goat));
      await saveItemInCart(sessionId, MEAT.goat);
      emitter({
        socketEvent,
        sessionId,
        msgToClient: checkout(MEAT.goat)
      })
      break;

    case '8':
      // socket.emit('server-to-client', checkout(MEAT.beef));
      await saveItemInCart(sessionId, MEAT.beef);
      emitter({
        socketEvent,
        sessionId,
        msgToClient: checkout(MEAT.beef)
      })
      break;

    case '9':
      // socket.emit('server-to-client', checkout(MEAT.assorted));
      await saveItemInCart(sessionId, MEAT.assorted);
      emitter({
        socketEvent,
        sessionId,
        msgToClient: checkout(MEAT.assorted)
      })
      break;

    case '10':
      // customer doesn't want meat
      // socket.emit('server-to-client', noMeat());
      emitter({
        socketEvent,
        sessionId,
        msgToClient: noMeat()
      })
      break;

    case '97':
      // socket.emit('server-to-client', 'work in progress on option 97');
      // Select 97 to see current order: 
      // When a customer selects “97”, the bot should be able to return current order
      const cart = await getCart(sessionId);
      emitter({
        socketEvent,
        sessionId,
        msgToClient: viewCurrentOrder(cart)
      })
      break;

    case '98':
      // socket.emit('server-to-client', 'work in progress on option 98');
      // Order History: return all placed order
      // Select 98 to see order history:
      // When a customer selects “98”, the bot should be able to return all placed order
      const orderHistory = await getOrderHistory(sessionId);
      emitter({
        socketEvent,
        sessionId,
        msgToClient: viewOrderHistory(orderHistory)
      })
    break;

    case '99':
      // socket.emit('server-to-client', orderPlaced(riceFlavour, meatType));
      // socket.emit('server-to-client', 'work in progress on option 99')
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
      // socket.emit('server-to-client', 'Please enter a valid response');
      emitter({
        socketEvent,
        sessionId,
        msgToClient: 'Please enter a valid response'
      })
      break;

  }
}