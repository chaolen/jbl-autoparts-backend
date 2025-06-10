const express = require("express");
const userController = require("../controllers/user/userControllers");
const authGuard = require("../utils/middlewares/auth");
const SetupValidator = require("../controllers/setup/validators/setup-validator");
const setupController = require("../controllers/setup/setupContoller");
const adminAuthGuard = require("../utils/middlewares/adminAuth");

const Router = express.Router();

Router.post('/', SetupValidator, setupController.initializeSetup)

Router.get('/check', setupController.checkSetup)

Router.post('/seed', setupController.runSeed)

Router.get('/admin', adminAuthGuard, setupController.adminCheck);

module.exports = Router;