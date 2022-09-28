const router = require("express").Router();
const {
  models: { User, Product, Cart },
} = require("../db");
const {
  requireToken,
  isAdmin,
  authenticatedUser,
} = require("./gatekeepingMiddleware");
module.exports = router;

router.get(
  "/:userId",
  requireToken,
  authenticatedUser,
  async (req, res, next) => {
    try {
      const allUserCarts = await Cart.findAll({
        where: {
          userId: req.user.dataValues.id,
          isComplete: true,
        },
        order: [["updatedAt", "DESC"]],
      });
      res.send(allUserCarts);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:userId",
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
      res.send(await targetCart.update(req.body));
    } catch (error) {
      next(error);
    }
  }
);
