const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  isComplete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  totalPrice: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Cart;
