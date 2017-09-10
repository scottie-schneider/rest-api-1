'use strict';
let express = require('express');
let app = express();
let routes = require('./routes');
let logger = require('morgan');

let jsonParser = require('body-parser').json;

app.use(logger('dev'));
app.use(jsonParser());

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
