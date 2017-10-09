'use strict';
var User = require('./userModel').User;
var constants = require('../constants/constants');

exports.sendRequestFriend = function (currentUser, friendId) {

    return findFriendUserById(friendId).then(function (friendUser) {
        if (isUserInsideArrayRequest(currentUser, friendId)){
            throw new Error('user already inside ArrayRequest ');
        } else {
            friendUser.friendRequest.push({userId: currentUser.id, action: constants.REJECT})
            friendUser.save();
            return friendUser;
        }
    }).then(function (friendUser) {
        currentUser.friendRequest.push({userId: friendUser.id, action: constants.FRENDREQUEST})
        currentUser.save();
        return friendUser;
    }).then(function (user) {
        return user;
    }).catch(function (error) {
        return error;
    })
};

exports.sendRejectRequest = function (currentUser, friendId) {
    return findFriendUserById(friendId).then(function (friendUser) {

        if (isUserInsideArrayRejectRequest(currentUser, friendId)){
            throw new Error("no user in the arrayRequest")
        } else {
            return changeUserAction(currentUser, friendUser, constants.REJECT);
        }
    }).then(function (friendUser) {
        return removeUserFromRequestArray(friendUser, currentUser);
    }).then(function (user) {
        return user;
    }).catch(function (error) {
        return error;
    })
};

exports.sendAcceptRequest = function (currentUser, friendId) {

    return findFriendUserById(friendId).then(function (friendUser) {
        if (isUserInsideArrayRequest(currentUser, friendId)) {
            throw new Error("no user in the arrayRequest")
        } else {
            friendUser.friends.push(currentUser);
            friendUser.save();
            return friendUser;
        }
    }).then(function (friendUser) {
        return addFriendToArrayFriends(friendUser, currentUser);
    }).then(function (user) {
        return user;
    }).catch(function (error) {
        return error;
    })
};

function changeUserAction(currentUser, friendUser, action) {

    return new Promise(function(resolve, reject) {

        var result = friendUser.friendRequest.filter(function(user) {
            return user.userId == currentUser.id;
        });

        var userReceived  = result[0];

        if (userReceived.action == constants.FRENDREQUEST) {

            var array = friendUser.friendRequest.filter(function (user) {
                return user.userId != currentUser.id;
            });
            friendUser.friendRequest = array;
            friendUser.save().then(function (friendUser) {
                resolve(friendUser);
            }).catch(function (error) {
                reject(error);
            })
        } else {

            var newArray = friendUser.friendRequest.filter(function (user) {
                return user.userId != currentUser.id;
            });
            newArray.push({userId: currentUser.id, action: action})
            friendUser.friendRequest = newArray;
            friendUser.save().then(function (friendUser) {
                resolve(friendUser);
            }).catch(function (error) {
                reject(error);
            })
        }
    })
}

function addFriendToArrayFriends(friendUser, user) {
    return new Promise(function(resolve, reject) {
        var filteredFriendsRequest = user.friendRequest.filter(function(friend) {
            return friend.userId != friendUser.id;
        });
        user.friendRequest = filteredFriendsRequest;
        user.friends.push(friendUser)
        user.save().then(function (user) {
            resolve(user);
        }).catch(function (error) {
            reject(error);
        })
    })
}

function removeUserFromRequestArray(friendUser, currentUser) {

    return new Promise(function(resolve, reject) {
        var filteredFriendsRequest = currentUser.friendRequest.filter(function(friend) {
            return friend.userId != friendUser.id;
        });
        currentUser.friendRequest = filteredFriendsRequest;
        currentUser.save().then(function (user) {
            resolve(user);
        }).catch(function (error) {
            reject(error);
        })
    })
}

function isUserInsideArrayRequest(currentUser, friendId) {

    var result = currentUser.friendRequest.filter(function (friend) {
        return friend.userId == friendId;
    });

    if (result.length != 0) {
        return true;
    } else {
        return false;
    }
}

function isUserInsideArrayRejectRequest(currentUser, friendId) {

    var result = currentUser.friendRequest.filter(function (friend) {
        return friend.userId == friendId;
    });

    if (result.length != 0) {
        return false;
    } else {
        return true;
    }
}

function findFriendUserById(friendId) {

    return User.findById(friendId).then(function (friend) {
        return friend;
    }).catch(function (error) {
        return error;
    })
}




