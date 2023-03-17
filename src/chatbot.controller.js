const { print } = require('./print.helper');
const { MEAT, RICE } = require('./constants');
const {
  restaurantMenu, 
  meatList,
  checkout,
  noMeat, 
  orderPlaced 
} = require('./messages');

module.exports = (msgFromClient, sessionId, socket) => {
  switch (msgFromClient) {
    case '0':
      print.info(`server message: customer with session id, ${sessionId}, has cancelled order`);
      socket.emit('server-to-client', `You have cancelled your order. Select 1 to place a new order`);
      break;

    case '1':
      socket.emit('server-to-client', restaurantMenu);
      break;

    case '2':
      socket.emit('server-to-client', meatList(RICE.pepperRice));
      break;

    case '3':
      socket.emit('server-to-client', meatList(RICE.jollofRice));
      break;

    case '4':
      socket.emit('server-to-client', meatList(RICE.friedRice));
      break;

    case '5':
      socket.emit('server-to-client', checkout(MEAT.catfish));
      break;

    case '6':
      socket.emit('server-to-client', checkout(MEAT.chicken));
      break;
    
    case '7':
      socket.emit('server-to-client', checkout(MEAT.goat));
      break;

    case '8':
      socket.emit('server-to-client', checkout(MEAT.beef));
      break;

    case '9':
      socket.emit('server-to-client', checkout(MEAT.assorted));
      break;

    case '10':
      // customer doesn't want meat
      socket.emit('server-to-client', noMeat());
      break;

    case '97':
      socket.emit('server-to-client', 'work in progress on option 97');
      // Select 97 to see current order: 
      // When a customer selects “97”, the bot should be able to return current order
      break;

    case '98':
      socket.emit('server-to-client', 'work in progress on option 98');
      // Order History: return all placed order
      // Select 98 to see order history:
      // When a customer selects “98”, the bot should be able to return all placed order
    break;

    case '99':
      // socket.emit('server-to-client', orderPlaced(riceFlavour, meatType));
      socket.emit('server-to-client', 'work in progress on option 99')
      break;
    
    default:
      socket.emit('server-to-client', 'Please enter a valid response');
      break;

  }
}