const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  date: {
    type: Date
  }, 
  items: {
    type: Array(mongoose.Schema.Types.Mixed)
  },
  paymentType: {
    type: String
  },
  address: {
    type: mongoose.Schema.Types.Mixed
  },
  status : {
    type: String
  }
})

const Order = mongoose.model('orders', orderSchema);
module.exports = Order;