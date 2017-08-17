var express = require('express');
var app = express();

var supplier = require('./supplierFunctionality.js');

app.post('/api/v1.0/registerSupplier', function (req, res) {
  	var callback = function (err, regres) {
		res.statusCode = regres.http_code;
		res.json(regres);
	};
	supplier.registerSupplier(req, callback);
});

app.post('/api/v1.0/viewSupplier', function (req, res) {
    var callback = function (err, regres) {
      res.statusCode = regres.http_code;
      res.json(regres);
  };
  supplier.viewSupplier(req, callback);
});

app.post('/api/v1.0/removeSupplier', function (req, res) {
    var callback = function (err, regres) {
      res.statusCode = regres.http_code;
      res.json(regres);
  };
  supplier.removeSupplier(req, callback);
});

app.post('/api/v1.0/updateSupplier', function (req, res) {
    var callback = function (err, regres) {
      res.statusCode = regres.http_code;
      res.json(regres);
  };
  supplier.updateSupplier(req, callback);
});




module.exports = app;