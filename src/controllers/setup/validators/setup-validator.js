const AppError = require("../../../utils/AppError");
const { BAD_REQUEST } = require("../../../utils/ErrorCodes");
const UserModel = require("../../../models/user.model");

const SetupValidator = async (req, res, next) => {

  const admin = await UserModel.findOne({ role: 'admin' });

  if (admin?._id) {
    return next(new AppError("Setup already executed.", BAD_REQUEST))
  }
  return next();

}

module.exports = SetupValidator;