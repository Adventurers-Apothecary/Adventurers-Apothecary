const router = require('express').Router()
const { models: { Product }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
      //not protected as all users should have access
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})
