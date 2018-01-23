const express = require('express');
const app = express();
const morgan = require('morgan');
// app.use(express.static('public'));
app.listen(process.env.PORT || 8080);

const pageRouter = require('./pageRouter')

app.use(morgan('common'));


app.use(pageRouter);

module.exports = {app};