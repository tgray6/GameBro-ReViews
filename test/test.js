'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const should = chai.should();
chai.use(chaiHttp);
const {app, runServer, closeServer} = require('../server');



describe('GET endpoint', function() {
	it('should return a 200 status code and html', function() {
		return chai.request(app)
		.get('/')
		.then(function(res) {
		res.should.have.status(200);	
		})
	});
});