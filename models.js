'use strict';

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
		this._id,
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

//remember, behind the scenes, the database will be db.postreviews., all lowercase and plural
const PostReview = mongoose.model('PostReview', reviewSchema);

module.exports = {PostReview};