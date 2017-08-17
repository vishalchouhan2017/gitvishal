var express = require('express');
var app = express();

var customer = require('./customerFunctionality.js');

app.post('/api/v1.0/registerCustomer', function (req, res) {
  	var callback = function (err, regres) {
		res.statusCode = regres.http_code;
		res.json(regres);
	};
	customer.registerCustomer(req, callback);
});

app.post('/api/v1.0/viewCustomer', function (req, res) {
    var callback = function (err, regres) {
      res.statusCode = regres.http_code;
      res.json(regres);
  };
  customer.viewCustomer(req, callback);
});

app.post('/api/v1.0/removeCustomer', function (req, res) {
    var callback = function (err, regres) {
      res.statusCode = regres.http_code;
      res.json(regres);
  };
  customer.removeCustomer(req, callback);
});

app.post('/api/v1.0/updateCustomer', function (req, res) {
    var callback = function (err, regres) {
      res.statusCode = regres.http_code;
      res.json(regres);
  };
  customer.updateCustomer(req, callback);
});




module.exports = app;