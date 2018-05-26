/**
 * Controller module for the middlewares used on user management: create, login, enable and disable.
 */

const connection =  require('../database/config');
const bcrypt = require('bcrypt');

//Fields used to query user data.
const userFields = [
    'email',
    'name',
    'totalpoints',
    'pointsfase1',
    'pointsfase2',
    'pointsfase3',
    'pointsfase4',
    'pointsfase5',
    'activeUser',
    'adminUser'
];

/**
 * Registers a new user in the database, by default it will be disabled
 * until the payment has been proved to the admin.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.registerUser = (req, res, next) => {
    let username = req.body.username;
    let name  = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    connection.query("SELECT username,email,name,password FROM users WHERE username = ?", [username], (err, results, fields) => {
        if(err) {
            return res.status(500).json({
                message: "Cannot register user.",
                error: err
            });
        }
        //console.log(results.length);
        if(results.length > 0 ) {
            return res.status(409).json({
                message: "User already registered."
            });
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
                console.log(password);
                if(err) {
                    return res.status(500).json({
                        message: "An error ocurred while trying to register.",
                        error: err
                    });
                }
                connection.query("INSERT INTO users (username,name, email, password,activeUser,adminUser) VALUES (?,?,?,?,0,0)", [username, name, email, hash], (err, result) => {
                    if(err) {
                        return res.status(500).json({
                            message: "An error ocurred while trying to register.",
                            error: err
                        });
                    }
                    res.status(201).json({
                        message:"user created",
                        result: result
                    });
                });
            });
        }
    });
 
}

exports.getUsers = (req, res, next) => {
    const orderByPoints = req.query.orderbypoints;
    let query = "SELECT ?? FROM users";
    if(orderByPoints === 'true') {
        query += ' order by totalpoints desc';
    }
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

exports.getUser = (req, res, next) => {
    const email = req.params.email;
    const query = "SELECT ?? FROM users WHERE users.email = ?";
    connection.query(query, [userFields, email], (err, results, fields) => {
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

/**
 * Enables a user, must be used when the deposit receipt is received.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.enableUser = (req, res, next) => {
    const isAdmin =  req.authData;
    if(req.authData.isAdmin != 1) {
        return res.status(401).json({
            message: "unauthorized"
        });
    }
    let email = req.body.email; 
    connection.query("UPDATE users SET activeUser = 1 WHERE users.email = ? AND users.activeUser <> 1", [email], (err, results, fields) => {
        if(err) {
            return res.status(500).json({
                    message: "An error ocurred while updating data.",
                    error: err
                });
            }
            if(results.affectedRows > 0) {
            return res.status(200).json({
                message: "update successful",
                result: results
            });
            } 
            return res.status(200).json({
            message: "No Changes were applied"
        });

    });
}

/**
 * Disables a user (in case is necessary...)
 */
exports.disableUser = (req, res, next) => {
    const isAdmin =  req.authData;
    if(req.authData.isAdmin != 1) {
        return res.status(401).json({
            message: "unauthorized"
        });
    }
    let email = req.body.email; 
    connection.query("UPDATE users SET activeUser = 0 WHERE users.email = ? AND users.activeUser <> 0", [email], (err, results, fields) => {
        if(err) {
            return res.status(500).json({
                 message: "An error ocurred while updating data.",
                 error: err
             });
         }
         if(results.affectedRows > 0) {
            return res.status(200).json({
                message: "update successful",
                result: results
            });
         } 
         return res.status(200).json({
            message: "No Changes were applied"
        });
    });
}

