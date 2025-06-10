const mongoose = require("mongoose");

const products = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  images: {
    type: [String],
  },
  uniqueCode: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  quantityRemaining: {
    type: Number,
    default: 0,
  },
  quantitySold: {
    type: Number,
    default: 0,
  },
  partNumber: {
    type: String,
    trime: true,
  },
  status: {
    type: String,
    trime: true,
  },
  sku: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "skus",
  },
  tags: {
    type: [String],
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    default: null
  },
  quantityThreshold: {
    type: Number,
    default: 1,
  }
}, {
  timestamps: true
});


const Products = mongoose.model("products", products);

products.index({
  name: "text",
  brand: "text",
  description: "text",
  uniqueCode: "text",
  partNumber: "text",
  status: "text",
  tags: "text"
});

module.exports = Products;