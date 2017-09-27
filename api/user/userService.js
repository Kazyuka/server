'use strict';
var User = require('./userModel').User;
var constants = require('../constants/constants');

exports.friendRequestService = function (user, userFriend, friendsRequest) {



    switch (friendsRequest) {
        case constants.CONFIRM:
            return confirmOrRejectUserRequest(user, userFriend, constants.REJECT);
            break;
        case constants.REJECT:
            return confirmOrRejectUserRequest(user, userFriend, constants.CONFIRM);
            break;
        case constants.DELETE:
            return  addOrDeleteUserWithFriends(user, userFriend, constants.ADD);
            break;
        case  constants.ADD:

            return addOrDeleteUserWithFriends(user, userFriend, constants.DELETE);
            break;
        default:
          return  Promise.reject(new Error("Request does not exist "))
    }
};

function confirmOrRejectUserRequest (user, friendUser, friendsRequests) {

   return new Promise(function(resolve, reject) {
        var filterUserArray = user.friends.filter(function(obj) {
            return obj.id === friendUser.id;
        })

        if (filterUserArray.length == 0) {
            friendUser.friendsRequests = friendsRequests
            user.friends.push(friendUser)
            user.save().then(function (user) {
                resolve(user);
            }).catch(function (error) {
                reject(error);
            })

        } else {
            var result = user.friends.filter(function(obj) {
                return obj.id != friendUser.id;
            });
            user.friends = result;
            friendUser.friendsRequests = friendsRequests;
            user.friends.push(friendUser);
            user.save().then(function (user) {
                resolve(user);
            }).catch(function (error) {
                reject(error);
            })
        }
    })
}

function addOrDeleteUserWithFriends(user, friendUser, friendsRequests) {

    return new Promise(function(resolve, reject) {
        var filterUserArray = user.friends.filter(function(obj) {
            return obj.id === friendUser.id;
        })

        console.log(filterUserArray.length)
        if (filterUserArray.length == 0) {
            friendUser.friendsRequests = request;
            user.friends.push(friendUser)

            console.log(friendUser)
            user.save().then(function (user) {
                resolve(user);
            }).catch(function (error) {
                reject(error);
            })

        } else {
            var result = user.friends.filter(function(obj) {
                return obj.id != friendUser.id;
            });
            friendUser.friendsRequests = friendsRequests;
            user.friends = result;
            user.save().then(function (user) {
                resolve(user);
            }).catch(function (error) {
                reject(error);
            })
        }
    })
}

