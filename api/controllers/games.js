/**
 * Controller module for the middlewares used on team management.
 */

const connection =  require('../database/config');

const gameQuery = "select game.*,\
a.name AS teamName1,\
b.name AS teamName2,\
a.Flag AS teamFlag1,\
b.Flag AS teamFlag2 \
FROM game \
INNER JOIN teams as a ON a.teamId = game.teamId1 \
INNER JOIN teams as b ON b.teamId = game.teamId2 \
WHERE  game.matchId= ? \
order by date";

exports.getGames = (req, res, next) => {
    const query = "select game.*,\
    a.name AS teamName1,\
    b.name AS teamName2,\
    a.Flag AS teamFlag1,\
    b.Flag AS teamFlag2\
    FROM game\
    INNER JOIN teams as a ON a.teamId = game.teamId1\
    INNER JOIN teams as b ON b.teamId = game.teamId2\
    order by date";
    connection.query(query,(err, results, fields) => {
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

exports.getGame = (req, res, next) => {
    const matchId = req.params.matchId;
    connection.query(gameQuery, [matchId],(err, results, fields) => {
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

exports.setGameScores = (req, res, next) => {
    const scoreTeam1 = req.body.scoreTeam1;
    const scoreTeam2 = req.body.scoreTeam2;
    const matchId = req.params.matchId;
    const setScoreQuery = "UPDATE game SET scoreTeam1 = ?, scoreTeam2 = ? WHERE game.matchId = ?";
    connection.query(setScoreQuery, [scoreTeam1, scoreTeam2, matchId],(err, results, fields) => {
        if(err) {
            return res.status(500).json({
                message: "An error ocurred while setting scores.",
                error: err
            });
        } 
        if(results.affectedRows > 0) {
            connection.query(gameQuery, [matchId], (err, results, fields) => {
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

exports.setGameScore = (req, res, next) => {
    const scoreTeamId = 'scoreTeam' + req.params.teamId;
    const score = req.body.score;
    const matchId = req.params.matchId;
    const setScoreQuery = "UPDATE game SET  ?? = ? WHERE game.matchId = ?";
    console.log(setScoreQuery);
    connection.query(setScoreQuery, [scoreTeamId, score, matchId],(err, results, fields) => {
        if(err) {
            return res.status(500).json({
                message: "An error ocurred while setting scores.",
                error: err
            });
        } 
        console.log(results);
        if(results.affectedRows > 0) {
            connection.query(gameQuery, [matchId], (err, results, fields) => {
                if(err) {
                    return res.status(500).json({
                        message: "An error ocurred while updating.",
                        error: err
                    });
                } else {
                    console.log(results);
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

exports.setWinner = (req, res, next) => {
    const winnerId = req.body.winnerId;
    const matchId = req.params.matchId;
    const setScoreQuery = "UPDATE game SET winnerId = ? WHERE game.matchId = ?";
    console.log(setScoreQuery);
    connection.query(setScoreQuery, [winnerId, matchId],(err, results, fields) => {
        if(err) {
            return res.status(500).json({
                message: "An error ocurred while setting scores.",
                error: err
            });
        } 
        console.log(results);
        if(results.affectedRows > 0) {
            connection.query(gameQuery, [matchId], (err, results, fields) => {
                if(err) {
                    return res.status(500).json({
                        message: "An error ocurred while updating.",
                        error: err
                    });
                } else {
                    console.log(results);
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
