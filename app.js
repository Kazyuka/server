'use strict';
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var session = require('express-session')
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true,
              maxAge: 365 * 24 * 60 * 60 * 1000},
    store: new MongoStore({mongooseConnection: mongoose.connection})
}))

app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});



console.log()
require('./routes')(app);
