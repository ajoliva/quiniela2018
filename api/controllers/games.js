/**
 * Controller module for the middlewares used on team management.
 */

const connection =  require('../database/config');

const gameQuery = "select game.*,\
a.name AS teamName1,\
b.name AS teamName2, \
c.name AS winnerName \
FROM game \
INNER JOIN teams as a ON a.teamId = game.teamId1 \
INNER JOIN teams as b ON b.teamId = game.teamId2 \
LEFT JOIN teams as c ON c.teamId = game.WinnerId \
WHERE  game.gameId= ? \
order by date";

exports.getGames = (req, res, next) => {
    const query = "select game.*,\
    a.name AS teamName1,\
    b.name AS teamName2, \
    c.name AS winnerName \
    FROM game\
    INNER JOIN teams as a ON a.teamId = game.teamId1\
    INNER JOIN teams as b ON b.teamId = game.teamId2\
    LEFT JOIN teams as c ON c.teamId = game.WinnerId \
    order by date";
    connection.query(query,(err, results, fields) => {
        console.log(results.length);
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
    const gameId = req.params.gameId;
    connection.query(gameQuery, [gameId],(err, results, fields) => {
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
    const gameId = req.params.gameId;
    const setScoreQuery = "UPDATE game SET scoreTeam1 = ?, scoreTeam2 = ? WHERE game.gameId = ?";
    connection.query(setScoreQuery, [scoreTeam1, scoreTeam2, gameId],(err, results, fields) => {
        if(err) {
            return res.status(500).json({
                message: "An error ocurred while setting scores.",
                error: err
            });
        } 
        if(results.affectedRows > 0) {
            connection.query(gameQuery, [gameId], (err, results, fields) => {
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
    const gameId = req.params.gameId;
    const setScoreQuery = "UPDATE game SET  ?? = ? WHERE game.gameId = ?";
    console.log(setScoreQuery);
    connection.query(setScoreQuery, [scoreTeamId, score, gameId],(err, results, fields) => {
        if(err) {
            return res.status(500).json({
                message: "An error ocurred while setting scores.",
                error: err
            });
        } 
        if(results.affectedRows > 0) {
            connection.query(gameQuery, [gameId], (err, results, fields) => {
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

exports.setWinner = (req, res, next) => {
    const winnerId = req.body.winnerId;
    const gameId = req.params.gameId;
    const setScoreQuery = "UPDATE game SET winnerId = ? WHERE game.gameId = ?";
    connection.query(setScoreQuery, [winnerId, gameId],(err, results, fields) => {
        if(err) {
            return res.status(500).json({
                message: "An error ocurred while setting scores.",
                error: err
            });
        } 
        if(results.affectedRows > 0) {
            connection.query(gameQuery, [gameId], (err, results, fields) => {
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
