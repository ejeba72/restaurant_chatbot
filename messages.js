// const riceFlavour = '';

const welcomeMsg = `
Hey there!
Welcome to Mama Ebo Pepper Rice!
Please select an option from the list:
Select 1 to Place an order,
Select 0 to cancel order`;

const restaurantMenu = `
Thank you for opting to place an order.
Here is our menu:
Select 2 for Rice and Pepper Stew,
Select 3 for Jollof rice and Moi-moi,
Select 4 for Fried Rice and Salad,
Select 98 to see order history,
Select 97 to see current order,
Select 0 to cancel order
`

function meatList(riceFlavour) { 
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
}

function checkout() { 
  return `
  Select 99 to checkout,
  Select 98 to see order history,
  Select 97 to see current order,
  Select 0 to cancel order
  `
}

function orderPlaced(riceFlavour, meatType) {
  return `
  Your order for ${riceFlavour}, garnished with ${meatType} has been placed, successfully.
  Select 1 to place another order.
  `
}

// Your order has been placed for 

function showInfo(riceFlavour, customerOrder, meatList) {
  return `
  riceFlavour ==> ${riceFlavour},
  customerOrder ==> ${customerOrder},
  meatList ==> ${meatList}
  `
}

module.exports = { 
  /*riceFlavour,*/ 
  welcomeMsg, 
  restaurantMenu, 
  meatList, 
  checkout,
  orderPlaced, 
  showInfo 
}



// const placeOrder = 
// `Select 99 to checkout order
// Select 98 to see order history
// Select 97 to see current order
// Select 0 to cancel order`

const moreReserve =
`5 Rice and oil beans
6 Rice and dry beans
7 Coconut rice
8 Banger rice`

// const riceAndStewOptions = `
// Select 5 
// select x for none of the options`