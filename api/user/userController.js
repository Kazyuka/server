'use strict';

var User = require('./userModel').User;
var Friend = require('./userModel').Friends;

exports.create = function (req, res) {

    var friend = new Friend( { name: req.body.name });

    var user = new User({
        name: req.body.name,
        friends: [friend]}
    );

    user.save(function (err,user) {
        if (err) return handleError(err);
         res.send(user);
    });
};

exports.findUser = function (req, res) {

    User.findById(req.params.id, function (err,user) {
        if (err) return handleError(err);
        res.json(user);
    });
};

exports.addFriend = function (req, res) {

    var newFriend = new Friend( { name: "test" });

    User.findById(req.params.id, function (err,user) {
        if (err) return handleError(err);

        user.friends.push(newFriend);

        user.save(function (err, updatedUser) {
            if (err) return handleError(err);
            res.send(updatedUser);
        });
    });
};

exports.removeFriend = function (req, res) {
    console.log(req.params.friendId);

    User.findById(req.params.id, function (err,user) {
        if (err) return handleError(err);

        for(var i = 0; i < user.friends.length; i++) {
            var obj = user.friends[i];
            console.log(obj)
        }

    });
};

exports.removeUser = function (req, res) {
    console.log(req.params.friendId);

    User.findById(req.params.id, function (err,user) {
        if (err) return handleError(err);

        for(var i = 0; i < user.friends.length; i++) {
            var obj = user.friends[i];
            console.log(obj)
        }

    });
};