const { print } = require('./print.helper');
const {
  restaurantMenu, 
  meatList,
  checkout,
  noMeat, 
  orderPlaced 
} = require('./messages');

module.exports = (msg, socketId, io) => {
  switch (msg) {
    case '0':
      print.info(`server message: customer with socket id, ${socketId}, has cancelled order`);
      io.emit('server to client', `You have cancelled your order. Select 1 to place a new order`);
      break;

    case '1':
      io.emit('server to client', restaurantMenu);
      break;

    case '2':
      riceFlavour = 'White Rice and Pepper Stew';
      io.emit('server to client', meatList(riceFlavour));
      break;

    case '3':
      riceFlavour = 'Jollof rice and Moi-moi';
      io.emit('server to client', meatList(riceFlavour));
      break;

    case '4':
      riceFlavour = 'Fried Rice and Salad';
      io.emit('server to client', meatList(riceFlavour));
      break;

    case '5':
      meatType = 'CatFish';
      io.emit('server to client', checkout(meatType));
      break;

    case '6':
      meatType = 'Chicken lap';
      io.emit('server to client', checkout(meatType));
      break;
    
    case '7':
      meatType = 'Goat meat';
      io.emit('server to client', checkout(meatType));
      break;

    case '8':
      meatType = 'Beef';
      io.emit('server to client', checkout(meatType));
      break;

    case '9':
      meatType = 'Assorted';
      io.emit('server to client', checkout(meatType));
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
      io.emit('server to client', orderPlaced(riceFlavour, meatType));
      break;
    
    default:
      io.emit('server to client', 'Please enter a valid response');
      break;

  }
}