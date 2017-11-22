var express = require('express');
var app = express();

var supplier = require('./supplierFunctionality.js');

app.post('/mukesh', function (req, res) {
  	var callback = function (err, regres) {
		res.statusCode = regres.http_code;
		res.json(regres);
	};
	supplier.mukesh(req, callback);
});

module.exports = app;
