'use strict';

var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users');

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

require('./routes')(app);
