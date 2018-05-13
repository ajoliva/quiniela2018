/**
 * Module to handle the game-related operations endpoints.
 */
const express = require('express');
const router  = express.Router();
const GamesController = require("../controllers/games");
const AuthController = require('../auth/loginStatus');

router.get("/gamelist", AuthController.checkAuth, GamesController.getGames);
router.get("/:gameId", AuthController.checkAuth, GamesController.getGame);


module.exports = router;
