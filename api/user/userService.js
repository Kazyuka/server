'use strict';
var User = require('./userModel').User;
var constants = require('../constants/constants');

exports.friendRequestService = function (user, userFriend, friendsRequest,friendId) {

    switch (friendsRequest) {
        case constants.CONFIRM:
            return userRequest(user, userFriend, constants.REJECT);
            break;
        case constants.REJECT:
            return userRequest(user, userFriend, constants.CONFIRM);
            break;
        case constants.DELETE:
            return  deleteUserWithFriends(user, userFriend, constants.ADD);
            break;
        case  constants.ADD:

            return addUserWithFriends(user, friendId, constants.DELETE);
            break;
        default:
          return  Promise.reject(new Error("Request does not exist "))
    }
};

function userRequest (user, friendUser, friendsRequests) {

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

function deleteUserWithFriends(user, friendUser, friendsRequests) {

    return new Promise(function(resolve, reject) {

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
    })
}

function addUserWithFriends(user, friendId,friendsRequests) {

    return new Promise(function(resolve, reject) {

        User.findById(friendId).then(function (userFriend) {

            var result = user.friends.filter(function(obj) {
                console.log(obj.id)
                return obj.id != friendId;
            });

                userFriend.friendsRequests = friendsRequests;
                user.friends = result
                user.friends.push(userFriend)
                user.save().then(function (user) {
                    resolve(user);
                }).catch(function (error) {
                    reject(error);
                })

        }).catch(function (error) {
            return error;
        })
    })
}


