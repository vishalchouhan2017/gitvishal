var TAG = 'app.js';

var express = require('express');
var app = express();
var env = require('./Environment/env.js').env;
var routes = require('./routes/index.js');
var path = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

var dbConfig = require('./Environment/mongoDatabase.js');
var log = require('./Environment/log4js.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//CORS issue in the Browser.
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", req.headers.origin);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS");
	res.header("Access-Control-Allow-Credentials", true);
	next();
});

//Routing

var supplier = require('./routes/supplier/supplier.js');
var customer = require('./routes/customer/customer.js');
var oms = require('./routes/oms/oms.js');


app.use('/', routes);
app.use('/supplier',supplier);
app.use('/customer',customer);
app.use('/oms',oms);
app.use('/static', express.static(__dirname+'/public'));

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		http_code : err.status || 500,
		message : err.message
	});
	console.log("req:- "+req.url);
	console.log("time : " + new Date());
	console.log("error triggered from app.js:- "+err.stack);
});

//Initialize connection once
dbConfig.createMongoConn(function(error){
	if(error){
		console.log('Unable to connect to the mongoDB server. Error:', error);
	}
	else{
			
					app.listen(8083);
					console.log('Listening on port 8083');
			}

		})


	
// });
//  	}
// });
