const mongoose = require("mongoose");

const sku = new mongoose.Schema({
  skuChunks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "skuChunks",
  },
}, {
  timestamps: true
});

const SKUs = mongoose.model("skus", sku);

module.exports = SKUs;