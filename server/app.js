'use strict';
var express = require('express');
var bodyParser = require('body-parser')
var path = require('path')
var app = express();


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/static', express.static(__dirname + '../client/public'));

app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});

require('./routes')(app);
