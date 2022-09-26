const router = require("express").Router();
const {
  models: { User, Cart, Cart_Products },
} = require("../db");
const {
  requireToken,
  isAdmin,
  authenticatedUser,
} = require("./gatekeepingMiddleware");
module.exports = router;

router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:userId/cart",
  requireToken,
  authenticatedUser,
  async (req, res, next) => {
    try {
      const userCart = await Cart.findOne({
        where: {
          userId: req.params.userId,
          isComplete: false,
        },
      });
      const userProducts = await userCart.getProducts();
      res.send(userProducts);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/:userId/cart",
  requireToken,
  authenticatedUser,
  async (req, res, next) => {
    try {
      const newCart = await Cart.findOrCreate({
        where: {
          userId: req.user.dataValues.id,
          isComplete: false,
        },
      });

      const newCartProduct = await Cart_Products.findOrCreate({
        where: {
          ...req.body,
          cartId: newCart[0].id,
        },
      });
      res.status(201).send(newCartProduct[0]);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:userId/cart/:productId",
  requireToken,
  authenticatedUser,
  async (req, res, next) => {
    try {
      const targetCart = await Cart.findOne({
        where: {
          userId: req.user.dataValues.id,
          isComplete: false,
        },
      });

      const targetCartProduct = await Cart_Products.findOne({
        where: {
          cartId: targetCart.id,
          productId: req.params.productId,
        },
      });

      res.send(targetCartProduct);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:userId/cart/:productId",
  requireToken,
  authenticatedUser,
  async (req, res, next) => {
    try {
      const targetCart = await Cart.findOne({
        where: {
          userId: req.user.dataValues.id,
          isComplete: false,
        },
      });

      const targetCartProduct = await Cart_Products.findOne({
        where: {
          cartId: targetCart.id,
          productId: req.params.productId,
        },
      });

      res.send(await targetCartProduct.update(req.body));
      await targetCartProduct.save();
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:userId/cart/:productId",
  requireToken,
  authenticatedUser,
  async (req, res, next) => {
    try {
      const targetCart = await Cart.findOne({
        where: {
          userId: req.user.dataValues.id,
          isComplete: false,
        },
      });

      const targetCartProduct = await Cart_Products.findOne({
        where: {
          cartId: targetCart.id,
          productId: req.params.productId,
        },
      });

      await targetCartProduct.destroy();
      res.send(targetCartProduct);
    } catch (error) {
      next(error);
    }
  }
);
