'use strict';
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var session = require('express-session')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});

require('./routes')(app);
