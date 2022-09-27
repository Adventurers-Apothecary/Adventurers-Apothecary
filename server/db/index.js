//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const { Sequelize } = require("sequelize");

// defining cart_products through table
const Cart_Products = db.define("cart_products", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

// associations here:
Cart.belongsTo(User);
User.hasMany(Cart);

Cart.belongsToMany(Product, { through: "cart_products" });
Product.belongsToMany(Cart, { through: "cart_products" });

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
    Cart_Products,
  },
};
