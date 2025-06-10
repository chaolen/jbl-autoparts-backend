const express = require("express");
const userController = require("../controllers/user/userControllers");
const SigupValidator = require("../controllers/user/validators/signupValidator");
const ValidateLogInData = require("../controllers/user/validators/loginValidator");
const adminAuthGuard = require("../utils/middlewares/adminAuth");
const ResetPasswordValidator = require("../controllers/user/validators/resetPasswordValidator");
const authGuard = require("../utils/middlewares/auth");

const Router = express.Router();

Router.post(
  "/signup",
  SigupValidator,
  userController.signUp
);
Router.post(
  "/login",
  ValidateLogInData,
  userController.logIn
);

Router.post(
  "/logout",
  userController.logout
);

Router.post(
  "/reset-password",
  adminAuthGuard,
  ResetPasswordValidator,
  userController.resetPassword,
);

Router.get(
  '/',
  authGuard,
  userController.getUsers
);

Router.get(
  '/details',
  authGuard,
  userController.getUserDetails,
);

Router.post(
  '/activate/:userId',
  adminAuthGuard,
  userController.activateUser
);

Router.post(
  '/deactivate/:userId',
  adminAuthGuard,
  userController.deactivateUser
);

Router.post(
  '/change-password/:userId',
  userController.changedPassword
);

Router.post(
  '/update-details/:userId',
  userController.updateDetails
);

module.exports = Router;