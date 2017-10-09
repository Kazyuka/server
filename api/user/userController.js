'use strict';
var User = require('./userModel').User;
var mongoose = require('mongoose');
var userService = require('./userService')
var session = require('express-session')

exports.create = function (req, res) {

    var user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        action: " "
    });
     user.save().then(function (user) {
        return res.send(user);
    }).catch(function (err) {
        return handleError(err)
    });
};

exports.findUser = function (req, res) {

    var userId = req.headers.id
    User.findById(userId).then(function (user) {
        return res.send(user);
    }).catch(function (err) {
        return handleError(err)
    });
};

exports.addFriend = function (req, res) {
   var id = req.headers.id;
   var newFriend = new  User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.nameFriend
   });

   User.findById(id).then(function (user) {
       return newFriend.save()
           .then(function (newFriendUser) {
               user.friends.push(newFriendUser);
               return user.save()
           }).then(function (updateUser) {
               return res.send(updateUser);
           }).catch(function (error) {
              return console.log(error);
           });
   })
};
exports.removeFriend = function (req, res) {
    var idFriend = req.body.id;
    var idUser = req.headers.id

   User.
    findById(idUser).
    populate('friends').exec().then(function (user) {

       var positiveArr = user.friends.filter(function(number) {
           console.log(number.id);
           return number.id != idFriend;
       })
        user.friends = positiveArr;
        return user.save()
    }).then(function (user) {
       return console.log(user)
   }).catch(function (error) {
       return console.log(error);
    })
};

exports.removeUser = function (req, res) {
    var id = req.headers.id;
   findById(id).then(function (user) {
        return user.remove()
    }).then(function (removeUser) {
        return console.log('user was remove' + removeUser);
    }).catch(function (eror) {
        console.log(eror);
    });
};

exports.showAllUsers = function (req, res) {
    User.find().then(function (users) {
        return res.send(users);
    }).catch(function (error) {
        console.log(eror);
    })
};


exports.friendRequest = function (req, res) {

   var userId = req.headers.id;
   var friendId = req.body.id;

    User.findById(userId).then(function (user) {
        return userService.sendRequestFriend(user, friendId);
    }).then(function (user) {
        return user
    }).catch(function (error) {
        console.log(error)
        return error
    })
}

exports.rejectRequest = function (req, res) {
    var userId = req.headers.id
    var friendId = req.body.id;
    User.findById(userId).then(function (user) {
        return userService.sendRejectRequest(user, friendId);
    }).then(function (user) {
        return user
    }).catch(function (error) {
        console.log(error)
        return error
    })
}
exports.acceptRequest = function (req, res) {
    var userId = req.headers.id
    var friendId = req.body.id;
    User.findById(userId).then(function (user) {
        return userService.sendAcceptRequest(user, friendId, friendAction);
    }).then(function (user) {
        return user
    }).catch(function (error) {
        console.log(error)
        return error
    })
}


