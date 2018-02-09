const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Mongoose internally uses a promise-like object,
// but its better to make Mongoose use built in es6 promises
mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');
const { PostReview } = require('./models');
// const pageRouter = require('./pageRouter')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static('public'));
app.use(morgan('common'));
// app.use(pageRouter);
// app.listen(process.env.PORT || 8080);
// const MongoClient = require('mongodb').MongoClient




app.get('/reviews', (req, res) =>{
	PostReview
		.find()
    .sort({'created': 'desc'})
		.then(reviews => {
			res.json({
				reviews: reviews.map(
					(reviews) => reviews.serialize())
			});

		})
		.catch(err =>{
			console.error(err);
			res.status(500).json({ message: 'Internal Server Error'})
		});
});





app.post('/reviews', (req, res) => {
  console.log(req.body)
	PostReview
		.create({
			author: req.body.author,
			postTitle: req.body.postTitle,
			gameTitle: req.body.gameTitle,
			gamePlatform: req.body.gamePlatform,
			gameScore: req.body.gameScore,
			gameImage: req.body.gameImage,
			postReview: req.body.postReview
		})
		.then(reviews => res.status(201).json(reviews.serialize()))
    // res.redirect('/homepage.html');
});



//PUT endpoint
app.put('/:id', (req, res) => {
  const updated = {};
  const updatedFields = ["postTitle", "gameTitle", "gamePlatform", "gameScore", "gameImage", "postReview"];
    updatedFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  PostReview
    .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
    .then(updatedReview => res.status(204).end())
    .catch(err => res.status(500).json({message: "Something Broke"}));
});






//DELETE ENDPOINT
app.delete('/:id', (req, res) => {
  PostReview
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    });
});



//COPIED AND PASTED runServer and closeServer from node-restaurants app

// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl = DATABASE_URL, port = PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };