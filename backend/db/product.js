const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  description : {
    type: String,
    required: true
  },
  purchasePrize :{
    type: Number,
    required: true
  },
  sellingPrize: {
    type: Number,
    required: true
  },
  images: Array(String),
  categoryId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', 
    required: true
  }
})

const Product = mongoose.model('products', productSchema);
module.exports = Product;