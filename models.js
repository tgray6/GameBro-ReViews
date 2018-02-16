'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
	author: {
		firstName: String,
		lastName: String
	},
	postTitle: {type: String, required: true},
	gameTitle: {type: String, required: true},
	gamePlatform: {type: String, required: true},
	gameScore: {type: Number, required: true},
	gameImage: {type: String, required: true},
	postReview: {type: String, required: true},
	created: {type: Date, default: Date.now}
});

reviewSchema.virtual('authorName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

reviewSchema.methods.serialize = function() {
	return {
		id: this._id,
		author: this.authorName,
		postTitle: this.postTitle,
		gameTitle: this.gameTitle,
		gamePlatform: this.gamePlatform,
		gameScore: this.gameScore,
		gameImage: this.gameImage,
		postReview: this.postReview,
		created: this.created
	};
};

//remember, behind the scenes, the database will be db.reviews., all lowercase and plural
const PostReview = mongoose.model('reviews', reviewSchema);





//USER SCHEMA
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {type: String},
  lastName: {type: String}
});

UserSchema.methods.userserialize = function() {
  return {
    username: this.username,
    firstName: this.firstName,
    lastName: this.lastName
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('user', UserSchema);

module.exports = {User, PostReview};