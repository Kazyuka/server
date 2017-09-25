'use strict';

var express = require("express");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

    name: String,
    friends:[UserSchema]

});

exports.User = mongose.model('User',shema);