const express = require("express");
const authGuard = require("../utils/middlewares/auth");
const {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
  getUserTransactions,
  getMyTransactionStatistics,
  cancelTransaction,
  getSalesStatistics,
  returnTransaction,
  getAllTransactions,
} = require("../controllers/transaction/transactionsController");
const adminAuthGuard = require("../utils/middlewares/adminAuth");

const Router = express.Router();

Router.post('/', authGuard, createTransaction);

Router.get('/', authGuard, getTransactions);

Router.get('/all-transactions', authGuard, getAllTransactions);

Router.put('/:transactionId', adminAuthGuard, updateTransaction)

Router.get('/my-transactions', authGuard, getUserTransactions);

Router.get('/statistics', authGuard, getMyTransactionStatistics);

Router.patch('/cancel/:transactionId', authGuard, cancelTransaction);

Router.patch('/return/:transactionId', authGuard, returnTransaction);

Router.get('/sales-statistics', getSalesStatistics);

module.exports = Router;