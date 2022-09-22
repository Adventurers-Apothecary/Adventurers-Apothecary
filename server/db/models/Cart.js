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
});

module.exports = Cart;

// how to configure model
// how to identify unique orders (date field? order pk?)

// one user has many carts (many ordered and one active)
// each cart has one user

//many to many association b/w cart and product models
// through table contains cartid and productid
// each instance of through model represents one product in one cart
// cart_products model contains quantity field
// post a new instance in cart product when a product is added
// we need a post route for cart_products model (users/:userId/cart ?)
// how to edit quantity in cart_products?

// magic method notes
// user model magic methos let you get the carts associated with the user
// cart model has magic methods that let you getUser, setuser, getProducts, setProducts, etc

// possible progress towards implementation:
// query user model to find the cart where isOrdered: false (getCart?)
// use that cart to locate all the products associated with that cart (getProducts?)
// should this querying process be happening in users route
// possibly in /api/users/:userID/cart
