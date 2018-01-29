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




//HTML ENDPOINT TESTS
describe('login endpoint', function() {
			it('should return a 200 status code and  login html', function() {
				return chai.request(app)
				.get('/')
				.then(function(res) {
				res.should.have.status(200);
				res.should.be.html;
				})
			});
});

describe('homepage endpoint', function() {
	it('should return a 200 status code and homepage html', function() {
		return chai.request(app)
		.get('/homepage')
		.then(function(res) {
		res.should.have.status(200);
		res.should.be.html;
		})
	});
});

describe('review endpoint', function() {
	it('should return a 200 status code and review html', function() {
		return chai.request(app)
		.get('/review')
		.then(function(res) {
		res.should.have.status(200);
		res.should.be.html;
		})
	});
});
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


//LETS DO THE GET TEST

describe ('GET endpoint at /reviews', function() {
	it('should return existing reviews', function(){
	let res;
	return chai.request(app)
		.get('/reviews')
		.then(function(_res){
			res=_res;
			res.should.have.status(200);
			res.body.should.have.property('reviews');
			res.body.should.be.a('object');
			// res.body.should.have.length.of.at.least(1);
			// return PostReview.count();
		})
		// .then(function(count){
		// 	res.body.should.have.lengthOf(count);
		// });
	});

	it('should return all reviews with the right fields', function() {
		let resReview;
		return chai.request(app)
			.get('/reviews')
			.then(function(res){
				res.should.have.status(200);
				res.should.be.json;
				// res.body.should.have.length.of.at.least(1);

				res.body.forEach(function(review){
					review.should.be.a('object');
					review.should.include.keys(
						'id', 'author', 'postTitle', 'gameTitle', 'gamePlatform', 'gameScore', 'gameImage', 'postReview', 'created');
				});
				resReview = res.body[0];
				return PostReview.findById(resReview.id);
			})
			.then(function(review){
				resReview.id.should.equal(review.id);
				resReview.author.should.equal(review.author);
				resReview.postTitle.should.equal(review.postTitle);
				resReview.gamePlatform.should.equal(review.gamePlatform);
				resReview.gameScore.should.equal(review.gamePlatform);
				resReview.gameImage.should.equal(review.gameImage);
				resReview.postReview.should.equal(review.gameReview);
				resReview.created.should.equal(review.created);
			});
	});
});

});
