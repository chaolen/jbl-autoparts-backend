const Validator = require("validator");
const mongoose = require("mongoose");
const AppError = require("../../../utils/AppError");
const { BAD_REQUEST } = require("../../../utils/ErrorCodes");

const TransactionValidator = (req, res, next) => {
  const {
    quantity,
    status,
    payment_method,
    sales_person,
    items,
    total,
    branch,
    customer,
    discount,
    remarks,
  } = req.body;

  // Quantity is required and must be a positive number
  if (quantity == null || !Validator.isNumeric(quantity.toString()) || Number(quantity) < 1) {
    return next(new AppError("Quantity must be a positive number.", BAD_REQUEST));
  }

  // Status is required
  if (!status || Validator.isEmpty(status)) {
    return next(new AppError("Status is required.", BAD_REQUEST));
  }

  // Payment method is required
  if (!payment_method || Validator.isEmpty(payment_method)) {
    return next(new AppError("Payment method is required.", BAD_REQUEST));
  }

  // Sales person should be a valid ObjectId if provided
  if (sales_person && !mongoose.Types.ObjectId.isValid(sales_person)) {
    return next(new AppError("Sales person must be a valid ID.", BAD_REQUEST));
  }

  // Items must be an array of ObjectIds and required
  if (!Array.isArray(items) || items.length === 0) {
    return next(new AppError("At least one product must be included in the transaction.", BAD_REQUEST));
  }
  for (const item of items) {
    if (!mongoose.Types.ObjectId.isValid(item)) {
      return next(new AppError("Invalid product ID in items.", BAD_REQUEST));
    }
  }

  // Total must be a positive number
  if (total == null || !Validator.isNumeric(total.toString()) || Number(total) < 0) {
    return next(new AppError("Total must be a non-negative number.", BAD_REQUEST));
  }

  // Discount must be a number if provided
  if (discount != null && (!Validator.isNumeric(discount.toString()) || Number(discount) < 0)) {
    return next(new AppError("Discount must be a non-negative number.", BAD_REQUEST));
  }

  // Branch is required
  if (!branch || Validator.isEmpty(branch)) {
    return next(new AppError("Branch is required.", BAD_REQUEST));
  }

  // Customer name must be a string if provided
  if (customer && typeof customer !== "string") {
    return next(new AppError("Customer must be a string.", BAD_REQUEST));
  }

  // Remarks must be a string if provided
  if (remarks && typeof remarks !== "string") {
    return next(new AppError("Remarks must be a string.", BAD_REQUEST));
  }

  return next();
};

module.exports = TransactionValidator;
