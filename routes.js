'use strict';

module.exports = function(app) {
    app.use('/api/users', require('./api/user'));
};