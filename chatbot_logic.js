const { print } = require('./helpers/print');

function chatbotLogic(msg) {
  print.info(`this is the chatbot logic`);
  print.info('message: ' + msg);
  io.emit('server to client', msg); // io.emit('eventName', data);
}

// const welcomeMsg = "Hey there! \nWelcome!"

const welcomeMsg = `
Hey there!
Welcome to Mama Ebo Pepper Rice!
Please select an option from the menu:
Select 1 to Place an order
Select 99 to checkout order
Select 98 to see order history
Select 97 to see current order
Select 0 to cancel order`

module.exports = { chatbotLogic, welcomeMsg }