const express = require("express");
const authGuard = require("../utils/middlewares/auth");
const {
  createSKU,
  deleteSKU,
  getSKUs,
  updateSKU,
  getChunkByOrder,
  bulkCreateSKUs,
  checkSKU,
} = require("../controllers/skus/skusController");
const adminAuthGuard = require("../utils/middlewares/adminAuth");

const Router = express.Router();

Router.post('/', adminAuthGuard, createSKU);

Router.post('/bulk', adminAuthGuard, bulkCreateSKUs);

Router.get('/chunk-by-order/:order', adminAuthGuard, getChunkByOrder);

Router.get('/', authGuard, getSKUs);

Router.get('/checker/:sku', authGuard, checkSKU);

Router.put('/:skuId', adminAuthGuard, updateSKU)

Router.delete('/:skuId', adminAuthGuard, deleteSKU)

module.exports = Router;