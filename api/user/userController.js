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

   var id = req.params.id;

   var newFriend = new  User({
        name: req.params.newFriend
   });

    User.findById(id).then(function (user) {

        console.log( user.friends);

        user.friends.push(newFriend);

        console.log( user.friends);
        return user.save();

    }).then(function (newFriend) {

        return res.send(newFriend);

    }).catch(function (error) {
        console.log(error);
    })
};
exports.removeFriend = function (req, res) {

    var idUser = req.params.id;

     User.
     findById(idUser).
     exec(function (err, user) {
         
     for(var i = 0; i < user.friends.length; i++) {
             var obj = user.friends[i];
            console.log(obj.name);
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

        return user.remove()

    }).then(function (removeUser) {

        return console.log('user was remove' + removeUser);

    }).catch(function (eror) {

        console.log(eror);
    });
};