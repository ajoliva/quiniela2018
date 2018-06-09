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
    let qualifyId = '';
    if(req.body.qualifyId) {
        qualifyId = req.body.qualifyId;
    }
    console.log('set prediction: GameDate: '+req.body.GameDate+' PredictionDate: '+req.body.PredictionDate)
    let fields = [
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
    let params = [
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
    ]
    let query = "insert into prediction (??) values (?, ?,?, ?, ?, ?,?,?,?";
    console.log(qualifyId);
    if(qualifyId !== '') {
        console.log("inserting");
        query += "," + qualifyId;
        fields.push('QualifyId');
        console.log(fields);
    }
    query += ")";
    connection.query(query, 
        params, 
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
    const qualifyId = req.body.qualifyId;
    let setScoreQuery;
    
    console.log(qualifyId);

    if(typeof qualifyId == 'undefined' || qualifyId=='null'){
        
         setScoreQuery = "UPDATE prediction SET  scoreTeam1= ?, scoreTeam2=?, winnerId=? WHERE predictionId=?";
        params = [scoreTeam1, scoreTeam2, winnerId,predictionId,]

    }else{
        
         setScoreQuery = "UPDATE prediction SET  scoreTeam1= ?, scoreTeam2=?, winnerId=?, qualifyId=? WHERE predictionId=?";
        params = [scoreTeam1, scoreTeam2, winnerId, qualifyId,predictionId,]
    }


    connection.query(setScoreQuery, params,(err, results, fields) => {
        if(err) {
            return res.status(500).json({
                message: "An error ocurred while setting scores.",
                error: err
            });
        } else {
            return res.status(200).json({
                message: "applied"
            });
        } 
    });
};

