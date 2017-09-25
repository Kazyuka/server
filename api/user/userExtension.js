'use strict';

exports.friendRequestExtention = function (user,req) {

    return new Promise(function(resolve, reject) {
        var idFriend = req.body.id;
        var request = user.friendsRequests.filter(function(number) {
            return number.id == idFriend;
        })
        if (request.length == 0) {
            user.friendsRequests.push(idFriend);
            user.save();
            resolve("The user received a request to add to friends");
        } else {
            reject("You already sent a request");
        }
    });
};

exports.cancelFriendRequestExtention = function (user,req) {

    return new Promise(function(resolve, reject) {
        var idFriend = req.body.id;
        var request = user.friendsRequests.filter(function(number) {
            return number.id != idFriend;
        })
        user.friendsRequests = request;
        user.save()
        resolve("The request was canceled");
    });
};

exports.acceptFriendRequestExtention = function (user,req) {

    return new Promise(function(resolve, reject) {
        var idFriend = req.body.id;
        var request = user.friendsRequests.filter(function(number) {
            return number.id != idFriend;
        })
        user.friendsRequests = request;
        user.friends.push(idFriend);
        user.save()
        resolve("The request was accepted");
    });
};