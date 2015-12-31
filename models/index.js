var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chatting');
exports.User = mongoose.model('User',require('./user'));

