const jwt = require("jsonwebtoken");
const AppError = require("../AppError");
const UserModel = require("../../models/user.model");
const Session = require("../../models/session.model");

const extractUser = async (req, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Authorization header missing or malformed", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    // @ts-ignore
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    req.user = decoded;

    const session = await Session.findOne({ token, isActive: true });
    if (!session) return res.status(401).json({ message: "Session expired or invalid" });

    const user = await UserModel.findById(decoded._id);
    return user;
  } catch (err) {
    return null;
  }
}

module.exports = extractUser;