const express = require("express");
const { getNewProducts, getFeaturedProducts } = require("../handlers/product-handler");
const { getCategory } = require("../handlers/category-handler");
const router = express.Router();

router.get("/new-products", async (req, res) => {
  const products= await getNewProducts();
  res.send(products)
})

router.get("/featured-products", async (req, res) => {
  const products= await getFeaturedProducts();
  res.send(products)
})

router.get('/categories', async (req,res) => {
  const categories = await getCategory();
  res.send(categories)
})

module.exports = router;