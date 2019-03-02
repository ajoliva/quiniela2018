/**
 * Module to handle the game-related operations endpoints.
 */
const express = require('express');
const router  = express.Router();
const GamesController = require("../controllers/games");
const AuthController = require('../auth/loginStatus');

router.get("/gamelist", AuthController.checkAuth, GamesController.getGames);
router.get("/:gameId", AuthController.checkAuth, GamesController.getGame);
router.patch("/:gameId/scores", GamesController.setGameScores);
router.patch("/:gameId/score/:teamId", GamesController.setGameScore);
router.patch("/:gameId/winner", GamesController.setWinner);
router.patch("/:gameId/finished", GamesController.setAsFinished);

module.exports = router;
