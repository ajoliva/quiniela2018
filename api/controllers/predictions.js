/**
 * Controller module for the middlewares used on team management.
 */

const connection =  require('../database/config');

const allPredictionsQuery = "select prediction.*,\
a.name AS teamName1,\
b.name AS teamName2 \
c.name AS userName, \
d.name AS winnerName \
FROM prediction \
INNER JOIN teams as a ON a.teamId = prediction.teamId1 \
INNER JOIN teams as b ON b.teamId = prediction.teamId2 \
INNER JOIN users as c ON c.userId = prediction.userId \
LEFT JOIN teams as d ON prediction.WinnerId <=>  d.teamId \
order by GameDate";

const predictionByIdQuery = "select prediction.*,\
a.name AS teamName1,\
b.name AS teamName2 \
c.name AS userName, \
d.name AS winnerName \
FROM prediction \
INNER JOIN teams as a ON a.teamId = prediction.teamId1 \
INNER JOIN teams as b ON b.teamId = prediction.teamId2 \
INNER JOIN users as c ON c.userId = prediction.userId \
LEFT JOIN teams as d ON prediction.WinnerId <=>  d.teamId \
WHERE  prediction.predictionId= ?";

exports.getAllPredictions = (req, res, next) => {
    connection.query(allPredictionsQuery,(err, results, fields) => {
        if(err) {
            return res.status(500).json({
                message: "An error ocurred while rerieving users.",
                error: err
            });
        }
        console.log(results);
        if(results.length == 0) {
            return res.status(404).json({
                message: "no records found"
            });
        }
        return res.status(200).json({
        results: results
        });
    });
};

exports.getPredictionsbyUser = (req, res, next) => {
    const userId = req.params.userId;
    const predictionsByUserQuery = "select prediction.*,\
        a.name AS teamName1,\
        b.name AS teamName2,\
        c.name AS userName, \
        d.name AS winnerName \
        FROM prediction \
        INNER JOIN teams as a ON a.teamId = prediction.teamId1 \
        INNER JOIN teams as b ON b.teamId = prediction.teamId2 \
        INNER JOIN users as c ON c.userId = prediction.userId \
        LEFT JOIN teams as d ON prediction.WinnerId <=>  d.teamId \
        WHERE prediction.userId = ? \
        order by GameDate";
        connection.query(predictionsByUserQuery, [userId],(err, results, fields) => {
            if(err) {
                return res.status(500).json({
                    message: "An error ocurred while rerieving users.",
                    error: err
                });
            }
            if(results.length == 0) {
                return res.status(404).json({
                    message: "no records found"
                });
            }
            return res.status(200).json({
            results: results
            });
        });
};

exports.getPrediction = (req, res, next) => {
    const predictionId = req.params.predictionId;

    connection.query(predictionByIdQuery, [predictionId],(err, results, fields) => {
        if(err) {
            return res.status(500).json({
                message: "An error ocurred while rerieving users.",
                error: err
            });
        }
        if(results.length == 0) {
            return res.status(404).json({
                message: "no records found"
            });
        }
        return res.status(200).json({
        results: results
        });
    });
};

exports.setPrediction = (req, res, next) => {
    const userid = req.body.userId;
    const gameId = req.body.gameId;
    const date = req.body.date;
    const teamId1 = req.body.teamId1;
    const teamId2 = req.body.teamId2;

    const fields = [
        'userId',
        'gameId', 
        'GameDate',
        'PredictionDate', 
        'teamId1',
        'scoreTeam1',
        'teamId2',
        'scoreTeam2',
        'WinnerId'
    ];
    const query = "insert into prediction (??) values (?, ?,?, ?, ?, ?,?,?,?)";
    connection.query(query, 
        [
            fields, 
            req.body.userId,
            req.body.gameId,
            req.body.GameDate,
            req.body.PredictionDate,
            req.body.teamId1,
            req.body.scoreTeam1,
            req.body.teamId2,
            req.body.scoreTeam2,
            req.body.WinnerId
        ], 
        (err, results, fields) => {
        if(err) {
            return res.status(500).json({
                message: "An error ocurred while rerieving users.",
                error: err
            });
        }
        return res.status(201).json({
            message: "entry created.",
            result: results
        });
    });
};

exports.updatePrediction = (req, res, next) => {
    const scoreTeam1 =  req.body.scoreTeam1;
    const scoreTeam2 = req.body.scoreTeam2;
    const winnerId = req.body.winnerId;
    const predictionId = req.params.predictionId;
    const setScoreQuery = "UPDATE game SET  scoreTeam1= ?. scoreTeam2=?, winnerId=? WHERE prediction.predictionId=?";
    console.log(setScoreQuery);
    connection.query(setScoreQuery, [scoreTeam1, scoreTeam2, winnerId, predictionId],(err, results, fields) => {
        if(err) {
            return res.status(500).json({
                message: "An error ocurred while setting scores.",
                error: err
            });
        } 
        if(results.affectedRows > 0) {
            connection.query(predictionByIdQuery, [predictionId], (err, results, fields) => {
                if(err) {
                    return res.status(500).json({
                        message: "An error ocurred while updating.",
                        error: err
                    });
                } else {
                    if(results.length > 0) {
                        return res.status(201).json({
                            results: results
                        });
                    }
                }
            });
        } else {
            return res.status(200).json({
                message: "no changes applied"
            });
        } 
    });
};

