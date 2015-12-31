var mongoose = require('mongoose')
var Schema = mongoose.Schema
var db = require('../model')
var async = require('async')
var gravatar = require('gravatar')

var User = new Schema({
	email:String,
	name:String,
	avatarUrl:String
})

exports.findUserById = function(_userId,callback){
	db.User.findOne({
		_id: _userId
	},callback)
}

exports.findByEmailOrCreate = function(email,callback){
	db.User.findOne({
		email:email
	},function(err,user){
		if(user){
			callback(null,user)
		} else {
			user = new db.User
			user.name = email.split('@')[0]
			user.avatarUrl = gravatar.url(email)
			user.save(callback)
		}
	})
}

module.exports = User