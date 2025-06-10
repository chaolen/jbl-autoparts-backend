const isValidUsername = require("../../../helpers/validators/isUsernameValid");

const ValidateLogInData = (req, res, next) => {
  try {
    isValidUsername(req.body.username);
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: error.message,
    });
  }

  next();
};


module.exports = ValidateLogInData;