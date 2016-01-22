var mongoose = require('mongoose');
// mongoose.connect('mongodb://192.168.0.101/chattingroom');
exports.User = mongoose.model('User',require('./user'));

