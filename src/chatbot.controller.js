const { print } = require('./print.helper');
const { MEAT, RICE } = require('./constants');
const {
  restaurantMenu, 
  meatList,
  checkout,
  noMeat, 
  orderPlaced 
} = require('./messages');

module.exports = (msg, sessionId, io) => {
  switch (msg) {
    case '0':
      print.info(`server message: customer with session id, ${sessionId}, has cancelled order`);
      io.emit('server to client', `You have cancelled your order. Select 1 to place a new order`);
      break;

    case '1':
      io.emit('server to client', restaurantMenu);
      break;

    case '2':
      io.emit('server to client', meatList(RICE.pepperRice));
      break;

    case '3':
      io.emit('server to client', meatList(RICE.jollofRice));
      break;

    case '4':
      io.emit('server to client', meatList(RICE.friedRice));
      break;

    case '5':
      io.emit('server to client', checkout(MEAT.catfish));
      break;

    case '6':
      io.emit('server to client', checkout(MEAT.chicken));
      break;
    
    case '7':
      io.emit('server to client', checkout(MEAT.goat));
      break;

    case '8':
      io.emit('server to client', checkout(MEAT.beef));
      break;

    case '9':
      io.emit('server to client', checkout(MEAT.assorted));
      break;

    case '10':
      // customer doesn't want meat
      io.emit('server to client', noMeat());
      break;

    case '97':
      io.emit('server to client', 'work in progress on option 97');
      // Select 97 to see current order: 
      // When a customer selects “97”, the bot should be able to return current order
      break;

    case '98':
      io.emit('server to client', 'work in progress on option 98');
      // Order History: return all placed order
      // Select 98 to see order history:
      // When a customer selects “98”, the bot should be able to return all placed order
    break;

    case '99':
      // io.emit('server to client', orderPlaced(riceFlavour, meatType));
      io.emit('server to client', 'work in progress on option 99')
      break;
    
    default:
      io.emit('server to client', 'Please enter a valid response');
      break;

  }
}