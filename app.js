'use strict';
let express = require('express');
let app = express();
let routes = require('./routes');

let jsonParser = require('body-parser').json;


app.use(jsonParser());

app.use('/questions', routes);

let port = process.env.PORT || 3000;

app.listen(port, () =>{
	console.log(`Express server is listening on port ${port}`);
});
