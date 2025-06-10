const Validator = require("validator");
const mongoose = require("mongoose");
const AppError = require("../../../utils/AppError");
const { BAD_REQUEST } = require("../../../utils/ErrorCodes");

const ProductValidator = (req, res, next) => {
  const {
    name,
    price,
    tags,
  } = req.body;

  const images = req.files; // multer puts uploaded files in req.files

  // Name is required
  if (!name || Validator.isEmpty(name)) {
    return next(new AppError("Product name is required.", BAD_REQUEST));
  }

  // Price must be a number and not negative
  if (price != null && (!Validator.isNumeric(price.toString()) || Number(price) < 0)) {
    return next(new AppError("Price must be a non-negative number.", BAD_REQUEST));
  }

  // Images must be an array of files (optional but if provided, must be valid)
  if (images && !Array.isArray(images)) {
    return next(new AppError("Images must be an array.", BAD_REQUEST));
  }

  // Tags must be an array of strings
  if (tags) {
    if (!Array.isArray(tags)) {
      return next(new AppError("Tags must be an array.", BAD_REQUEST));
    }
    for (const tag of tags) {
      if (typeof tag !== 'string') {
        return next(new AppError("Each tag must be a string.", BAD_REQUEST));
      }
    }
  }

  return next();
};

module.exports = ProductValidator;
