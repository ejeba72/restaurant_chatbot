module.exports = {
  welcomeMsg: `
    Hey there!
    Welcome to Mama Ebo Pepper Rice!
    Please select an option from the list:
    Select 1 to Place an order,
    Select 0 to cancel order
  `,

  restaurantMenu: `
    Thank you for opting to place an order.
    Here is our menu:
    Select 2 for White Rice and Pepper Stew,
    Select 3 for Jollof rice and Moi-moi,
    Select 4 for Fried Rice and Salad,
    Select 98 to see order history,
    Select 97 to see current order,
    Select 0 to cancel order
  `,

  meatList: (riceFlavour) => { 
    return `
      What would you garnish your ${riceFlavour} with?
      Select 5 for CatFish,
      Select 6 for Chicken lap,
      Select 7 for Goat meat, 
      Select 8 for Beef,
      Select 9 for Assorted,
      Select 10 if you don't want any of them,
      Select 98 to see order history,
      Select 97 to see current order,
      Select 0 to cancel order
    `
  },

  checkout: () => { 
    return `
      Select 99 to checkout,
      Select 98 to see order history,
      Select 97 to see current order,
      Select 0 to cancel order
    `
  },

  orderPlaced: (riceFlavour, meatType) => {
    return `
      Your order for ${riceFlavour}, garnished with ${meatType} has been placed, successfully.
      Select 1 to place another order.
    `
  },
}