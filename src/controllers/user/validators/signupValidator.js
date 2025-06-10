const Validator = require("validator");
const AppError = require("../../../utils/AppError");
const {
  BAD_REQUEST
} = require("../../../utils/ErrorCodes");
const roles = require("../../../utils/roles");

const SigupValidator = (req, res, next) => {
  const {
    username,
    password,
    role
  } = req.body;
  if (!username || Validator.isEmpty(username)) {
    return next(new AppError("Username cannot be empty.", BAD_REQUEST))
  }
  if (!password || Validator.isEmpty(password)) {
    return next(new AppError("Password is required.", BAD_REQUEST))
  }

  if (!role || Validator.isEmpty(role)) {
    return next(new AppError("Role is required.", BAD_REQUEST))
  }

  if (!roles.includes(role)) {
    return next(new AppError("Role is not recognized.", BAD_REQUEST))
  }

  if (!Validator.isLength(password, { min: 8 })) {
    return next(new AppError("Password isn't strong.", BAD_REQUEST))
  }
  return next();

}

module.exports = SigupValidator;