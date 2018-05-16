/**
 * Module to handle the game-related operations endpoints.
 */
const express = require('express');
const router  = express.Router();
const GamesController = require("../controllers/games");
const AuthController = require('../auth/loginStatus');

router.get("/gamelist", AuthController.checkAuth, GamesController.getGames);
router.get("/:matchId", AuthController.checkAuth, GamesController.getGame);
router.patch("/:matchId/scores", GamesController.setGameScores);
router.patch("/:matchId/score/:teamId", GamesController.setGameScore);
router.patch("/:matchId/winner", GamesController.setWinner);

module.exports = router;
