const router = require("express").Router();
const {
  models: { User, Cart },
} = require("../db");
const { requireToken, isAdmin} = require("./gatekeepingMiddleware");
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
