'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');
const should = chai.should();
const expect = chai.expect();
const { PostReview } = require('../models');

chai.use(chaiHttp);
mongoose.Promise = global.Promise;




//REMOVED PAGEROUTER, TESTS NO LONGER APPLY
//pageRouter.js was messing up the endpoints on server side.
//remember the server sees the files differently than your local dev computer.

//HTML ENDPOINT TESTS
// describe('login endpoint', function() {
// 			it('should return a 200 status code and  login html', function() {
// 				return chai.request(app)
// 				.get('/')
// 				.then(function(res) {
// 				res.should.have.status(200);
// 				res.should.be.html;
// 				})
// 			});
// });

// describe('homepage endpoint', function() {
// 	it('should return a 200 status code and homepage html', function() {
// 		return chai.request(app)
// 		.get('/homepage')
// 		.then(function(res) {
// 		res.should.have.status(200);
// 		res.should.be.html;
// 		})
// 	});
// });

// describe('review endpoint', function() {
// 	it('should return a 200 status code and review html', function() {
// 		return chai.request(app)
// 		.get('/review')
// 		.then(function(res) {
// 		res.should.have.status(200);
// 		res.should.be.html;
// 		})
// 	});
// });
//END HTML TESTS





function generatePlatform(){
	const platforms = ['PC', 'PS4', 'Switch', 'XBOX'];
	return platforms[Math.floor(Math.random() * platforms.length)];
}

function generateScore(){
	const score = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	return score[Math.floor(Math.random() * score.length)];
}


function generatePostData() {
	return{
		author: {
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName()
		},
		postTitle: faker.lorem.words(),
		gameTitle: faker.random.words(),
		gamePlatform: generatePlatform(),
		gameScore: generateScore(),
		gameImage: faker.image.imageUrl(),
		postReview: faker.lorem.paragraph(),
		created: faker.date.recent()
	}
}

function seedReviewData(){
	console.info("Seeding Review Data");
	const seedData = [];
	for (let i=1; i<=3; i++){
		seedData.push(generatePostData());
	}
	return PostReview.insertMany(seedData);
}








//now we need to make a function to delete the entire database after each test.
function tearDownDb(){
	console.warn('Deleting Database');
	return mongoose.connection.dropDatabase();
}








describe('Review API Resource', function() {
  // we need each of these hook functions to return a promise
  // otherwise we'd need to call a `done` callback. `runServer`,
  // `seedBlogData` and `tearDownDb` each return a promise,
  // so we return the value returned by these function calls.
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedReviewData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });


//GET TEST
describe ('GET endpoint', function() {
	it('should return existing reviews', function(){
	let res;
	return chai.request(app)
		.get('/reviews')
		.then(function(_res){
			res=_res;
			res.should.have.status(200);
			res.body.should.have.property('reviews');
			res.body.should.be.a('object');
			res.body.reviews.should.have.lengthOf(3);
			return PostReview.count();
		})
	});

	it('should return all reviews with the right fields', function() {
		let resReview;
		return chai.request(app)
			.get('/reviews')
			.then(function(res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.reviews.should.have.length.of.at.least(1);

				res.body.reviews.forEach(function(review){
					review.should.be.a('object');
					review.should.include.keys(
						'id', 'author', 'postTitle', 'gameTitle', 'gamePlatform', 'gameScore', 'gameImage', 'postReview', 'created');
				});
				resReview = res.body.reviews[0];
				return PostReview.findById(resReview.id);
			})
			.then(function(review){
				resReview.id.should.equal(review.id);
				resReview.author.should.equal(review.authorName);
				resReview.postTitle.should.equal(review.postTitle);
				resReview.gamePlatform.should.equal(review.gamePlatform);
				resReview.gameScore.should.equal(review.gameScore);
				resReview.gameImage.should.equal(review.gameImage);
				resReview.postReview.should.equal(review.postReview);
				resReview.created.should.equal(review.created.toJSON());
			});
	});
});


//PUT TEST
describe('POST endpoint', function(){
	it('should add a new review post with proper keys', function(){
		const newPost = generatePostData();

		return chai.request(app)
			.post('/reviews')
			.send(newPost)
			.then(function(res) {
				res.should.have.status(201);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.include.keys('id', 'author', 'postTitle', 'gameTitle', 'gamePlatform', 'gameScore', 'gameImage', 'postReview', 'created');
				res.body.id.should.not.be.null;
				res.body.author.should.equal(`${newPost.author.firstName} ${newPost.author.lastName}`);
				res.body.postTitle.should.equal(newPost.postTitle);
				res.body.gamePlatform.should.equal(newPost.gamePlatform);
				res.body.gameScore.should.equal(newPost.gameScore);
				res.body.gameImage.should.equal(newPost.gameImage);
				res.body.postReview.should.equal(newPost.postReview);
				res.body.created.should.not.be.null;
				return PostReview.findById(res.body.id);
			})
			.then(function(review){
				review.author.firstName.should.equal(newPost.author.firstName);
				review.author.lastName.should.equal(newPost.author.lastName);
				review.postTitle.should.equal(newPost.postTitle);
				review.gamePlatform.should.equal(newPost.gamePlatform);
				review.gameScore.should.equal(newPost.gameScore);
				review.gameImage.should.equal(newPost.gameImage);
				review.postReview.should.equal(newPost.postReview);
			});
	});
})




//PUT TEST
describe ('PUT endpoint', function(){
	it('should update appropriate fields you submit', function() {
		const updatedReview = {
			postTitle: "Megaman",
			gameTitle: "Megaman 7",
			gamePlatform: "SNES",
			gameScore: 10,
			gameImage: "http://img2.game-oldies.com/sites/default/files/packshots/nintendo-super-nes/megaman-vii-usa.png",
			postReview: "Pretty Solid Game"
		};

		return PostReview
			.findOne()
			.then(function(review){
				updatedReview.id=review.id;

				return chai.request(app)
					.put(`/${review.id}`)
					.send(updatedReview);
			})
			.then(function(res) {
				res.should.have.status(204);
				return PostReview.findById(updatedReview.id);
			})
			.then(function(review) {
				review.postTitle.should.equal(updatedReview.postTitle);
				review.gameTitle.should.equal(updatedReview.gameTitle);
				review.gamePlatform.should.equal(updatedReview.gamePlatform);
				review.gameScore.should.equal(updatedReview.gameScore);
				review.gameImage.should.equal(updatedReview.gameImage);
				review.postReview.should.equal(updatedReview.postReview);
			});
});
});




//DELETE TEST
describe ('DELETE endpoint', function() {
	it('should delete a review by ID', function(){
		let reviewPost;

		return PostReview
			.findOne()
			.then(function(_reviewPost) {
				reviewPost=_reviewPost;
				return chai.request(app).delete(`/${reviewPost.id}`);
			})
			.then(function(res){
				res.should.have.status(204);
				return PostReview.findById(reviewPost.id);
			})
			.then(function(_reviewPost){
				should.not.exist(_reviewPost)
			});
	});
});

});