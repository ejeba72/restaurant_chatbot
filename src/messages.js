module.exports = {
  welcomeMsg: `
    Hey there!
    Welcome to Mama Osakpolor Pepper Rice! :)
    Please select an option from the list:
    Select 1 to Place an order,
    0 to cancel order
  `,

  restaurantMenu: `
    Thank you for opting to place an order.
    Here is our menu:
    Select 2 for White Rice and Pepper Stew,
    3 for Jollof rice and Moi-moi,
    4 for Fried Rice and Salad,
    98 to see order history,
    97 to see current order,
    0 to cancel order
  `,

  meatList: (riceFlavour) => { 
    return `
      What would you like to garnish your ${riceFlavour} with?
      Select 5 for CatFish,
      6 for Chicken lap,
      7 for Goat meat, 
      8 for Beef,
      9 for Assorted,
      10 if you don't want any of them,
      98 to see order history,
      97 to see current order,
      0 to cancel order
    `
  },

  checkout: (meatType) => { 
    return `
      You have picked ${meatType}.
      Select 99 to checkout,
      98 to see order history,
      97 to see current order,
      0 to cancel order
    `
  },

  noMeat: () => { 
    return `
      You have chosen not to include meat.
      Select 99 to checkout,
      98 to see order history,
      97 to see current order,
      0 to cancel order
    `
  },

  orderPlaced: (order) => {
    return `
    Your order for the following items has been placed successfully: ${order?.items?.join(', ')}.
  
    Select 1 to place another order.
    `
  },
  
  viewCurrentOrder: (cart) => {
    let message = 'Your current order is empty';
    if(cart?.items?.length > 0) message = `You have added the following items to your current order: ${cart.items?.join(', ')}`;
    return message;
  },
  
  viewOrderHistory: (orderHistory) => {
    if(orderHistory?.length < 1) return `You order history is empty`;
    const orderHistoryString = orderHistory.map(order => order.items.join(', ')).join(', ');
    return `You ordered the following items: ${orderHistoryString}`;
  }
}