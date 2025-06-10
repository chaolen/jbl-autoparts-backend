// @ts-nocheck
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const user = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    lowercase: true,
  },
  customRole: {
    type: String,
    lowercase: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  changedPassword: Date,
}, {
  timestamps: true
});

user.statics.login = async function (username, password) {
  const user = await this.findOne({
    username,
  });
  let isPasswordCorrect;

  if (user) {
    isPasswordCorrect = await bcrypt.compare(password, user.password);
  }

  if (!isPasswordCorrect) {
    throw Error("Password or email aren't correct");
  }

  return user;
};

user.statics.signup = async function (username, password, role, name, customRole) {
  const user = await this.findOne({
    username,
    role
  });

  if (user) {
    throw Error("this email is already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await this.create({
    username,
    password: hashedPassword,
    role,
    name,
    customRole,
    active: true,
  });

  return newUser;
};

user.statics.changePasswordById = async function (userId, newPassword) {
  const user = await this.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  user.changedPassword = new Date();

  await user.save();

  return user;
};

user.methods.createPasswordResetToken = function () {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let resetToken = "";
  for (let i = 0; i < 6; i++) {
    resetToken += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetTokenExpires = Date.now() + 24 * 60 * 60 * 1000;

  return resetToken;
};

const Users = mongoose.model("users", user);

module.exports = Users;