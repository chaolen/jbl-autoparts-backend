const Validator = require("validator");
const AppError = require("../../../utils/AppError");
const {
  BAD_REQUEST
} = require("../../../utils/ErrorCodes");

const ResetPasswordValidator = (req, res, next) => {
  const {
    userId,
    newPassword
  } = req.body;
  if (!userId || Validator.isEmpty(userId)) {
    return next(new AppError("Username cannot be empty.", BAD_REQUEST))
  }
  if (!newPassword || Validator.isEmpty(newPassword)) {
    return next(new AppError("Password is required.", BAD_REQUEST))
  }

  if (!Validator.isStrongPassword(newPassword)) {
    return next(new AppError("Password isn't strong.", BAD_REQUEST))
  }
  return next();

}

module.exports = ResetPasswordValidator;