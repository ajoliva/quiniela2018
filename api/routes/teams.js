/**
 * Module to handle the team-related operations endpoints.
 */
const express = require('express');
const router  = express.Router();
const TeamsController = require("../controllers/teams");
const AuthController = require('../auth/loginStatus');

router.get("/teams", AuthController.checkAuth, TeamsController.getTeams);
router.get("/team/:id", AuthController.checkAuth, TeamsController.getTeam);


module.exports = router;
