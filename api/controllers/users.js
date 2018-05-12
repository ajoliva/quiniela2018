const connection =  require('../database/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Controller module for the middlewares used on user management: create, login, enable and disable.
 */

/**
 * Registers a new user in the database, by default it will be disabled
 * until the payment has been proved to the admin.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.registerUser = (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    connection.query("SELECT email,password FROM users WHERE email = ?", [email], (err, results, fields) => {
            if(err) {
                return res.status(500).json({
                    message: "Cannot register user.",
                    error: err
                });
            }
            //console.log(results.length);
            if(results.length > 0 ) {
                return res.status(409).json({
                    message: "E-Mail already in use."
                });
            } else {
                bcrypt.hash(password, 10, (err, hash) => {
                    if(err) {
                       return res.status(500).json({
                            message: "An error ocurred while trying to register.",
                            error: err
                        });
                    }
                    connection.query("INSERT INTO users (name, email, password) VALUES (?,?,?)", [username, email, hash], (err, result) => {
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

/**
 * Enables a user, must be used when the deposit receipt is received.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.enableUser = (req, res, next) => {
    //TODO: logic to enable user after payment is done.
}

/**
 * Disables a user (in case is necessary...)
 */
exports.disableUser = (req, res, next) => {
    //TODO: logic to disable user. (In case needed)
}


