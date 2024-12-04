const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  date: {
    type: Date
  },
  items: {
    type: Array(any)
  },
  status : {
    type: Number
  }
})

const Order = mongoose.model('orders', orderSchema);
module.exports = Order;