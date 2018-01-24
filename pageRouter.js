const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


router.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

router.get('/homepage', (req, res) => {
  res.sendFile(__dirname + '/public/homepage.html');
});

router.get('/review', (req, res) => {
  res.sendFile(__dirname + '/public/review.html');
});

module.exports = router;