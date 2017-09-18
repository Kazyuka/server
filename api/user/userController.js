'use strict';

var User = require('./userModel').User;

exports.create = function (req, res) {

    var user = new User({
        name: req.body.name,
    });
     user.save().then(function (user) {
        return res.send(user);
    }).catch(function (err) {
        return handleError(err)
    });
};

exports.findUser = function (req, res) {

    var id = req.params.id;
    User.findById(id).then(function (user) {
        return res.send(user);
    }).catch(function (err) {
        return handleError(err)
    });
};

exports.addFriend = function (req, res) {

   var id = req.body.id;
   var newFriend = new  User({
        name: req.body.nameFriend
   });

    User.findById(id).then(function (user) {
        user.friends.push(newFriend);
        return user.save();
    }).then(function (updateUser) {
        return res.send(updateUser);
    }).catch(function (error) {
        console.log(error);
    })
};
exports.removeFriend = function (req, res) {

    var idUser = req.params.id;
    User.
    findById(idUser).
    populate('friends').then(function (friends) {
        return console.log(friends);
    }).catch(function (error) {
        console.log(error);
    })
};

exports.removeUser = function (req, res) {

    var id = req.params.id;
    User.findById(id).then(function (user) {
        return user.remove()
    }).then(function (removeUser) {
        return console.log('user was remove' + removeUser);
    }).catch(function (eror) {
        console.log(eror);
    });
};