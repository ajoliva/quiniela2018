/**
 * Controller module for the middlewares used on team management.
 */

const connection =  require('../database/config');

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
    const gameId = req.params.gameId;
    const query = "select game.*,\
    a.name AS teamName1,\
    b.name AS teamName2,\
    a.Flag AS teamFlag1,\
    b.Flag AS teamFlag2\
    FROM game\
    INNER JOIN teams as a ON a.teamId = game.teamId1\
    INNER JOIN teams as b ON b.teamId = game.teamId2\
    WHERE  game.matchId= ? \
    order by date";
    connection.query(query, [gameId],(err, results, fields) => {
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

exports.setGameScores = () => {};

exports.setGameScore = () => {};

exports.setWinner = () => {};
