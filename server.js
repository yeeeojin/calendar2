'use strict';
const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendFile('index.html', { root: __dirname });
});

server.listen(port, () => {
	console.log('Calendar app listening on ' + port + '!');
	console.log('direction : ' + __dirname);
});
