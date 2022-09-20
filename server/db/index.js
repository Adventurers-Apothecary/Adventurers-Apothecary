//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
// const Cart = require("./models/Cart");

// associations could go here!
// one user has many cart instances
// one cart instance has one user
// one cart instance has one product

// notes on cart model:
// every instance keeps track of one product id and user id
// with a quantity field to keep track of quantities
// when finding a user's overall cart you could query the model to find every instance
// associated with the user's id

// associations here:

module.exports = {
  db,
  models: {
    User,
    Product,
    // Cart
  },
};
