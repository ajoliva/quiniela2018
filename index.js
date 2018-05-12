var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var compression = require('compression');
var fs = require('fs');
var mysql      = require('mysql');


var PORT=3000;


app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.set('superSecret', 'thisisthesecret');

app.use(express.static(path.join(__dirname, 'ngx-admin/dist/'), { dotfiles: 'allow' }));

var apiRoutes = express.Router();


var server = app.listen(PORT, function () {
    console.log('Server is running.. port:' + PORT);
});