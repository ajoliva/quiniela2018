/**
 * Controller module for the middlewares used on team management.
 */

const connection =  require('../database/config');

const teamFields = [
    'id',
    'Name',
    'Flag'
]

exports.getTeams = (req, res, next) => { const query = "SELECT ?? FROM teams";
    connection.query(query, [userFields], (err, results, fields) => {
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

exports.getTeam = (req, res, next) => {
    const email = req.params.id;
    const query = "SELECT ?? FROM teams WHERE teams.id = ?";
    connection.query(query, [userFields, email], (err, results, fields) => {
        if(err) {
            return res.status(500).json({
                message: "An error ocurred while rerieving team.",
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

exports.createTeam = (req, res, next) => {};

exports.updateTeam = (req, res, next) => {};
