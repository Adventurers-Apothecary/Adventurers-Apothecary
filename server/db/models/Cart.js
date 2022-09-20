const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

// Options for cart model =:
// every instance is one cart with a userid and an array of product ids...
// but how to keep track of quantity?

// every instance keeps track of one product id and user id
// with a quantity field to keep track of quantities
// when finding a user's overall cart you could query the model to find every instance
// associated with the user's id

module.exports = Cart;
