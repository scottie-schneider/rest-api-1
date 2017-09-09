'use strict';
let express = require('express');
let app = express();

let port = process.env.PORT || 3000;

app.use( (req, res, next) =>{
	console.log('first');
	next();
})

app.listen(port, () =>{
	console.log(`Express server is listening on port ${port}`);
});
