const express = require("express");
const { getNewProducts, getFeaturedProducts, getProductForListing, getProduct } = require("../handlers/product-handler");
const { getCategory, getCategoryById } = require("../handlers/category-handler");
const { getBrands } = require("../handlers/brand-handler");
const { getWishlist, addToWishlist, removeFromWishlist } = require("../handlers/wishlist-handler");
const { getCart, addToCart, removeFromCart, clearCart } = require("../handlers/shopping-cart-handler");
const { addOrder, getCustomerOrders } = require("../handlers/order-handler");
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

router.get('/categories/:id', async (req,res) => {
  const id = req.params["id"];
  const category = await getCategoryById(id);
  res.send(category)
})

router.get('/brands', async (req,res) => {
  const brands = await getBrands();
  res.send(brands)
})

router.get('/products', async (req,res) => {
  const { searchCat, categoryId, page, pageSize, sortBy, sortOrder, brandId } = req.query;
  const products = await getProductForListing(
    searchCat,
    categoryId,
    page,
    pageSize,
    sortBy,
    sortOrder,
    brandId
  );
  res.send(products)
})

router.get("/product/:id", async (req, res) => {
  const id = req.params["id"];
  const product = await getProduct(id);
  res.send(product)
})

router.get("/wishlist", async (req, res) => {
  const userId = req.user.id;
  const items = await getWishlist(userId)
  res.send(items)
})

router.post("/wishlist/:id", async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;
  const item = await addToWishlist(userId, productId)
  res.send(item)
})

router.delete("/wishlist/:id", async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;
  await removeFromWishlist(userId, productId);
  res.send({message : "ok"});
})

router.get("/carts", async (req, res) => {
  const userId = req.user.id;
  const items = await getCart(userId)
  res.send(items)
})

router.post("/carts/:id", async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;
  const quantity = req.body.quantity
  const item = await addToCart(userId, productId,quantity)
  res.send(item)
})

router.delete("/carts/:id", async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;
  const item = await removeFromCart(userId, productId)
  res.send({message: "ok"})
})

router.post('/order', async (req,res) => {
  const userId = req.user.id;
  const order = req.body;
  await addOrder(userId, order);
  await clearCart(userId);
  return res.send({
    message:"Order Created"
  })
})

router.get('/orders', async (req,res) => {
  const userId = req.user.id;
  const orders = await getCustomerOrders(userId)
  return res.send(orders)
})

module.exports = router;