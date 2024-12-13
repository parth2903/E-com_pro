const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    //required: true
  },
  shortDescription: {
    type: String,
    //required: true
  },
  description : {
    type: String,
    //required: true
  },
  price :{
    type: Number,
    //required: true
  },
  discount: {
    type: Number,
    //required: true
  },
  images: Array(String),
  categoryId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', 
    // required: true
  },
  brandId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand', 
    // required: true
  },
  isFeatured:{
    type: Boolean
  },
  inNew:{
    type: Boolean
  }

})

const Product = mongoose.model('products', productSchema);
module.exports = Product;