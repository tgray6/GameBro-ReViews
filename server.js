const express = require('express');
const app = express();
const morgan = require('morgan');

const mongoose = require('mongoose');

// Mongoose internally uses a promise-like object,
// but its better to make Mongoose use built in es6 promises
mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');
const { PostReview } = require('./models');


app.use(express.static('public'));
app.listen(process.env.PORT || 8080);

const pageRouter = require('./pageRouter')

app.use(morgan('common'));


app.use(pageRouter);

module.exports = {app};