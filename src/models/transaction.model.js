const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  items: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
      },
      count: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  cashier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  partsman: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 1,
  },
  status: {
    type: String,
    enum: ['reserved', 'cancelled', 'completed', 'returned'],
    default: 'reserved',
  },
  invoiceId: {
    type: String,
    unique: true,
    sparse: true
  },
},
  { timestamps: true }
);

const Transactions = mongoose.model("transactions", transactionSchema);

module.exports = Transactions;