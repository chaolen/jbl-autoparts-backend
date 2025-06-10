const AppError = require("../AppError");
const roles = require("../roles");
const extractUser = require("./common");

const adminAuthGuard = async (req, _, next) => {
  const user = await extractUser(req, next);
  if (!user) {
    return next(new AppError("Invalid or expired token", 401));
  }
  // roles[0] = admin role
  if (user.role !== roles[0]) {
    return next(new AppError("You are not authorized to execute this!", 401));
  }

  req.user = {
    _id: user._id,
    username: user.username
  }

  next();
};

module.exports = adminAuthGuard;