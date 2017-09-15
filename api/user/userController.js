'use strict';

var User = require('./userModel').User;

exports.create = function (req, res) {

    var user = new User({
        name: req.body.name,
        friends: []}
    );
    user.save().then(function (user) {
        res.send(user);
    }).catch(function (err) {
        return handleError(err)
    });
};

exports.findUser = function (req, res) {

    var id = req.params.id;

    User.findById(id).then(function (user) {
        res.json(user);
    }).catch(function (err) {
        return handleError(err)
    });
};

exports.addFriend = function (req, res) {

   var id = req.params.id;
   var newFriend = new  User({
        name: req.params.newFriend}
    );

    User.findById(id).then(function (user) {
        user.friends.push(newFriend);
        user.save().then(function (updatedUser) {
            res.send(updatedUser);
        });
    }).catch(function (error) {
        console.log(error);
    })
};
exports.removeFriend = function (req, res) {



    User
  User.findAndFilter()
    var id = req.params.id;
     User.
     findById(id).
     exec(function (err, user) {

         if (err) return handleError(err);

         for(var i = 0; i < user.friends.length; i++) {
             var obj = user.friends[i];

             if(obj == req.params.idFriend){

                var us = user.friends.remove(obj)
                 user.save();
             }
         }
     });
};

exports.removeUser = function (req, res) {

    var id = req.params.id;

    User.findById(id).then(function (user) {

        user.remove().then(function (user) {

            res.send("user was delete");
        });

    }).catch(function (eror) {

        console.log(eror);
    });
};