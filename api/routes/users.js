/**
 * Module to handle the user-related operations endpoints.
 */
const express = require('express');
const router  = express.Router();
const UserController = require("../controllers/users");
const AuthController = require('../auth/loginStatus');

router.post("/register", UserController.registerUser);
router.post("/login", AuthController.login);
router.patch("/enableuser", AuthController.checkAuth, UserController.enableUser);
router.patch("/disableuser", AuthController.checkAuth, UserController.disableUser);
router.get("/test", (req, res, next) => {console.log("testing this shit")});
module.exports = router;
