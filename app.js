'use strict';
let express = require('express');
let app = express();
let routes = require('./routes');

let jsonParser = require('body-parser').json;
let logger = require('morgan');

app.use(logger('dev'));
app.use(jsonParser());

let mongoose = require('mongoose');
// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });
// Connect to the DB
mongoose.connect(process.env.DATABASE);
// Handle any errors for the DB
mongoose.connection.on('error', (err) => {
	console.error(`Oh noes! ${err.message}`);
});
// Indicator we've successfully connected and a bit of positivity
mongoose.connection.once('open', () => {
	console.log(`DB connection success! You are amazing ${process.env.NAME || 'human'}!`);
});

app.use('/questions', routes);

// catch 404 and forward to error handler
app.use( (req, res, next) => {
	let err = new Error('Not found!');
	err.status = 404;
	next(err);
})

// Error Handler 
app.use( (err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	})
})

let port = process.env.PORT || 3000;

app.listen(port, () =>{
	console.log(`Express server is listening on port ${port}`);
});
