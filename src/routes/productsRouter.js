const express = require("express");
const authGuard = require("../utils/middlewares/auth");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProductsByStatus
} = require("../controllers/products/productsController");
const adminAuthGuard = require("../utils/middlewares/adminAuth");
const ProductValidator = require("../controllers/products/validators/productValidator");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const Router = express.Router();

Router.post('/', adminAuthGuard, upload.array('files'), ProductValidator, createProduct);

Router.get('/', authGuard, getProducts);

Router.get('/products-by-status', authGuard, getAllProductsByStatus);

Router.get('/:productId', authGuard, getProductById);

Router.put('/:productId', adminAuthGuard, upload.array('files'), ProductValidator, updateProduct)

Router.delete('/:productId', adminAuthGuard, deleteProduct)

module.exports = Router;