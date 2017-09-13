'use strict';

var express = require('express');
var bodyParser = require('body-parser')
var app = express();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/users');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

require('./routes')(app);
