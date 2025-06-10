const AppError = require("../AppError");
const extractUser = require("./common");
const roles = require("../roles");

const authGuard = async (req, _, next) => {
  const user = await extractUser(req, next);
  if (!user) {
    return next(new AppError("Invalid or expired token", 401));
  }

  if (!roles.includes(user.role)) {
    return next(new AppError("User role not recognized.", 401));
  }

  next();
};

module.exports = authGuard;