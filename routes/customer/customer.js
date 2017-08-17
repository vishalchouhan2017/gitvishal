var express = require('express');
var app = express();

var registerCustomer = require('./registerCustomer.js');

app.post('/api/v1.0/registerCustomer', function (req, res) {
  	var callback = function (err, regres) {
		res.statusCode = regres.http_code;
		res.json(regres);
	};
	registerCustomer.registerCustomer(req, callback);
});


module.exports = app;