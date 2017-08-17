var TAG = 'app.js';

var express = require('express');
var app = express();
var env = require('./Environment/env.js').env;
var routes = require('./routes/index.js');
var path = require('path');
// var aclinit = require('./routes/oms/aclInit');
// var aclRoleUpdate = require('./routes/oms/addAclRoles');


//user acl
// var userAclInit = require('./routes/customer/ACL/customerAclInit');

// var userAclRoleupdate = require('./routes/customer/ACL/customerAclUpdate');
// var userAclupdate = false;

// var customerDataMigrationACL = require('./routes/customer/ACL/customerDataMigrationACL');
// var customerDataMigrationAclUpdate = false;

// This flag determines if any new roles should be added to prod. Should always be false.
// var aclupdate = false;

//below file will be loaded on start of applicaiton, used to schedule node cron jobs.

// var dailyNotificationNodeJobs = require('./nodecronjobs/dailyNotificationNodeJobs.js');
// var pricingCronJobs = require('./nodecronjobs/pricePrecomputeCron');
// var rfqInquirymisCron = require('./nodecronjobs/rfqInquirymisCron');
// var rfqInquiryExpireCron = require('./nodecronjobs/rfqInquiryExpireCron');
// var supplierNotificationforExpringInquiryCron = require('./nodecronjobs/supplierNotificationforExpringInquiryCron.js');
// var expireSellerMarginsCron = require('./nodecronjobs/expireSellerMarginsCron.js');
// var assignSellerMarginsCron = require('./nodecronjobs/assignSellerMarginsCron.js');
// var checkCategoryWiseSupplierExistsCron = require('./nodecronjobs/checkCategoryWiseSupplierExistsCron.js');
// var customerPendingInvoiceCron = require('./nodecronjobs/customerPendingCron.js');

// var generateReports = require('./nodecronjobs/reportsGeneration.js');
// var NewGenerateReports = require('./nodecronjobs/NewReportsGeneration.js');

// var supplierNotificationforTomorrowDelivery = require('./nodecronjobs/supplierNotificationforTomorrowDelivery.js')
// var internalPanelTodayDelivery = require('./nodecronjobs/internalNotificationforTodayDelivery.js')
// var monthlyGSTReportCron = require('./nodecronjobs/monthlyGSTReportCron.js');

//configs for redis and session management.
// var redisConfigFile = require('./Environment/redis.js');
// var redisConfig = redisConfigFile.getRedisConfig(env);
// var session = require('express-session');
// var redisStore = require('connect-redis')(session);

// redisConfigFile.createRedisConn(function(err){
// 	if (!err)
//  	{
// 		 app.use(session({
// 		     secret: redisConfigFile.getSessionEncryptionKey(env),
// 		     // create new redis store.
// 		 		store: new redisStore({client: redisConfigFile.redisConn,ttl : 60 * 30}),
// 		     saveUninitialized: false,
// 		     resave: false,
// 		     cookie: { secure: false, maxAge: null, SameSite:false, domain:'.msupply.com'}
// 		}));

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
				if (env === "prd") {
					app.listen(8080);
					console.log('Listening on port 8080');
				} else if (env === "stg") {
					app.listen(8081);
					console.log('Listening on port 8081');
				} else if (env === "dev") {
					app.listen(8082);
					console.log('Listening on port 8082');
				}else if (env === "demo") {
					app.listen(8080);
					console.log('Listening on port 8080');
				}else {
					//loc
					app.listen(8083);
					console.log('Listening on port 8083');
				}
			}

		})


	
// });
//  	}
// });
