const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();


mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');
const { PostReview } = require('./models');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static('public'));
app.use(morgan('common'));



//USERS AND AUTHENTICATION

const passport = require('passport');

//JSON WEB TOKEN AUTH
const jwtAuth = passport.authenticate('jwt', { session: false });

//USER MODEL DATA
const {User} = require('./models');

//USERS ROUTER data
const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
app.use('/users', usersRouter);
app.use('/auth', authRouter);

passport.use(localStrategy);
passport.use(jwtStrategy);

//CORS SECTION
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});


//GET
app.get('/reviews', jwtAuth, (req, res) =>{
	PostReview
		.find()
    .sort({'created': 'desc'})
    .limit(5)
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


//POST
app.post('/reviews', jwtAuth, (req, res) => {
  console.log(req.body)
	PostReview
		.create({
			author: {firstName: req.body.firstName,
               lastName: req.body.lastName},
      author_id: req.user.userID,
			postTitle: req.body.postTitle,
			gameTitle: req.body.gameTitle,
			gamePlatform: req.body.gamePlatform,
			gameScore: req.body.gameScore,
			gameImage: req.body.gameImage,
			postReview: req.body.postReview
		})
		.then(reviews => res.status(201).json(reviews.serialize()))
});


//PUT ENDPOINT
app.put('/reviews/:id', jwtAuth, (req, res) => {
  PostReview
    .findById(req.params.id)
    .then(review => {
      console.log(review.author_id);
      console.log(req.user);
        if(review.author_id!==req.user.userID){
          console.log("Ids don't match");
          res.status(403).json({message: `${review.author_id} does not match ${req.user.userID}`});
          return null;
        }
        const updated = {};
        const updatedFields = ["postTitle", "gameTitle", "gamePlatform", "gameScore", "gameImage", "postReview"];

        updatedFields.forEach(field => {
          if (field in req.body) {
            updated[field] = req.body[field];
          }
        });
      return PostReview.findByIdAndUpdate(req.params.id, {$set: updated}, {new:true});
    })
    .then(updatedReview => {if (updatedReview != null)
      return res.status(200).json(updatedReview.serialize())})
    .catch(err => res.status(500).json(err))
});



//DELETE ENDPOINT
app.delete('/reviews/:id', jwtAuth, (req, res) => {
  PostReview
    .findById(req.params.id)
    .then(review => {
      console.log(review.author_id);
      console.log(req.user);
        if(review.author_id!==req.user.userID){
          console.log("Ids don't match");
          res.status(403).json({message: `${review.author_id} does not match ${req.user.userID}`});
          return null;
        }
        else{
          return PostReview
          .findByIdAndRemove(req.params.id);
        }
    })
    .then(deletedReview => {if (deletedReview != null)
      return res.sendStatus(204);
    });
});


let server;

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

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
