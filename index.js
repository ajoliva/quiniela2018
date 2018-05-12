const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const compression = require('compression');
//importing config
const config = require('./config.json');
const dbConnection = require("./api/database/config");
//importing routers
const userRoutes = require('./api/routes/users');

app.use(morgan('dev'));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'ngx-admin/dist/'), { dotfiles: 'allow' }));

//user router
app.use('/api/users', userRoutes);

//error handling
app.use('/api', (req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use('/api', (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

var server = app.listen(config.app.PORT, () => {
    console.log('Server is running.. port:' + config.app.PORT);
});
