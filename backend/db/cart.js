const mongoose = require("mongoose")
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  productId: {
    type: Array(String)
  }
});

const Cart = mongoose.model('carts', cartSchema);
module.exports = Cart;