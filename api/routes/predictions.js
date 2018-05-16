/**
 * Module to handle the prediction-related operations endpoints.
 */
const express = require('express');
const router  = express.Router();
const PredictionsController = require("../controllers/predictions");
const AuthController = require('../auth/loginStatus');

router.get("/", AuthController.checkAuth, PredictionsController.getAllPredictions);
router.get("/:predictionId", AuthController.checkAuth, PredictionsController.getPrediction);
router.get("/user/:userId", AuthController.checkAuth, PredictionsController.getPredictionsbyUser);
router.post("/", AuthController.checkAuth, PredictionsController.setPrediction);
router.patch("/:predictionId",AuthController.checkAuth, PredictionsController.updatePrediction);

module.exports = router;
