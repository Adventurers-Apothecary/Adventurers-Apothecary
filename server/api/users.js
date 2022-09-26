const router = require("express").Router();
const {
  models: { User, Cart },
} = require("../db");
const { requireToken, isAdmin, authenticatedUser} = require("./gatekeepingMiddleware");
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

router.get("/:userId/cart", async (req, res, next) => {
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
});

// make sure to put back authenticatedUser and requireToken
