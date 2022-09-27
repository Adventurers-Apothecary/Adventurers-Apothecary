//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const { Sequelize } = require("sequelize");

// defining cart_products through table
const Cart_Products = db.define(
  "cart_products",
  {
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    hooks: {
      // for smoother price handling, possibly use beforeCreatehook?
      // beforeCreate(cart_product, options) {
      //   if (cart_product) {
      //     cart_product.price = cart_product.price * 100;
      //   }
      // },
      // retrieval hook not set up correctly, retrieval price display handled on front-end for now
      // afterFind(cart_products, options) {
      //   if (cart_products) {
      //     cart_products.price = cart_products.price / 100;
      //   }
      // },
    },
  }
);

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
