const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define(
  "product",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    imageUrl: {
      type: Sequelize.STRING,
      defaultValue:
        "https://m.media-amazon.com/images/I/91PHqgBwPYL._CR0,281,1577,1577_UX256.jpg",
    },
    description: {
      type: Sequelize.TEXT,
    },
  },
  {
    hooks: {
      // beforeSave hook allows the creation of a cart_product with a dollar-value price (ex. 12.99)
      // that is saved with a penny-value price (ex. 1299)
      beforeSave(product, options) {
        product.price = product.price * 100;
      },
      // retrieval hook not set up correctly, retrieval price display handled on front-end for now
      // afterFind(product, options) {
      // },
    },
  }
);

module.exports = Product;
