const router = require("express").Router();
const {
  models: { User, Cart, Cart_Products },
} = require("../db");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");
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

// how to protect this route so the signed in user can only access their cart?

router.get("/:userId/cart", requireToken, async (req, res, next) => {
  try {
    const loggedInUserId = req.user.dataValues.id;
    const userCheck = loggedInUserId === Number(req.params.userId);
    if (userCheck) {
      const userCart = await Cart.findOne({
        where: {
          userId: req.params.userId,
          isComplete: false,
        },
      });
      const userProducts = await userCart.getProducts();
      res.send(userProducts);
    } else {
      res.status(403).send("Forbidden.");
    }
  } catch (err) {
    next(err);
  }
});

router.post("/:userId/cart", requireToken, async (req, res, next) => {
  try {
    const loggedInUserId = req.user.dataValues.id;
    const userCheck = loggedInUserId === Number(req.params.userId);
    if (userCheck) {
      const newCart = await Cart.findOrCreate({
        where: {
          userId: req.params.userId,
          isComplete: false,
        },
      });

      // let body = { quantity: 100, productId: 3 };

      const newCartProduct = await Cart_Products.findOrCreate({
        where: {
          ...req.body,
          cartId: newCart[0].id,
        },
      });
      res.status(201).send(newCartProduct[0]);

      // dummy solution to test posting function
      // const newCart = await Cart.findOrCreate({
      //   where: {
      //     userId: req.params.userId,
      //     isComplete: false,
      //   },
      // });
      // const newCartProduct = await Cart_Products.findOrCreate({
      //   // replace with res.body stuff?
      //   where: {
      //     quantity: 1,
      //     productId: 8,
      //     cartId: newCart[0].id,
      //   },
      // });
      // res.status(201).send(newCartProduct[0]);

      // alt solution, might be needed:
      // const checkForCartProduct = await Cart_Products.findOne({
      //   // replace with req.body stuff?
      //   where: {
      //     // productId: res.body(productId)
      //     productId: 9,
      //     cartId: newCart[0].id,
      //   },
      // });
      // if (checkForCartProduct) {
      //   // temporary...
      //   res.send("Product already in cart.");
      // } else {
      //   // replace with req.body stuff?
      //   const newCartProduct = await Cart_Products.create({
      //     productId: 9,
      //     cartId: newCart[0].id,
      //   });
      //   res.status(201).send(newCartProduct);
      // }
    } else {
      res.status(403).send("Forbidden.");
    }
  } catch (err) {
    next(err);
  }
});
