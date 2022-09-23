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
      // beforeSave hook allows the creation of a cart_product with a dollar-value price (ex. 12.99)
      // that is saved with a penny-value price (ex. 1299)
      beforeSave(cart_product, options) {
        console.log("price before: ", cart_product.price);
        cart_product.price = cart_product.price * 100;
      },
      // this hook may be a work in progress...
      // it allows the retrieval of a cart_product instance with the price represented in dollar-value (ex. 12.99)
      // this should not modify the penny-value price in the database itself
      afterFind(cart_product, options) {
        cart_product.price = cart_product.price / 100;
      },
    },
  }
);

// associations here:
Cart.belongsTo(User);
User.hasMany(Cart);

Cart.belongsToMany(Product, { through: "cart_products" });
Product.belongsToMany(Cart, { through: "cart_products" });

// test function for model hooks

// async function find() {
//   await Cart_Products.create({
//     quantity: 100,
//     price: 7.99,
//     cartId: 1,
//     productId: 2,
//   });
//   const testCart = await Cart_Products.findOne({
//     where: { cartId: 1, productId: 1 },
//   });
//   price = testCart.price;
//   console.log(price);
// }

// find();

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
    Cart_Products,
  },
};
