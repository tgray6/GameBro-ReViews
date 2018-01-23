'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const should = chai.should();
chai.use(chaiHttp);
const {app, runServer, closeServer} = require('../server');



//HTML ENDPOINT TESTS
describe('login endpoint', function() {
	it('should return a 200 status code and  login html', function() {
		return chai.request(app)
		.get('/index')
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