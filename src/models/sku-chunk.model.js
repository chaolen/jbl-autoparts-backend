const mongoose = require("mongoose");

const skuChunk = new mongoose.Schema({
  order: {
    type: Number,
    required: true,
  },
  chunk: {
    type: String,
    required: true,
    trim: true
  },
}, {
  timestamps: true
});

const SKUChunks = mongoose.model("skuChunks", skuChunk);

module.exports = SKUChunks;