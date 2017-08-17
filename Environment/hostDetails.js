//This file contains Hosting details(IP adress and PORT number) where application will be deployed.
var env = require('./env.js').env;

//Object that represent mysql hosts, port for all environments.
var hostDetails = {
"loc": {
		"host": "localhost",
		"port": "8083"
	}
}

//Object that represent magento hosts, port for all environments.

//Object that represent angular js for all environments.
var webHostDetails = {
"loc": {
		"host": "localhost",
		"port": "8083"
	}
}

//Object that represent deployed node hosts, port for all environments.
var deployedHostDetails = {
	"loc": {
		//"host": "nodejs-supplier.stg.msupply.com",
		"host": "localhost",
		"port": "8083"
	}
}

//Product host details.
var productHostDetails = {
	"loc": {
		"host": "localhost",
		"port": ""
	}
}

var WHICH_HOST = null;			//variable which holds the host and port of existing environment.
var DEPLOYED_HOST = null;
var MAGENTO_HOST = null;
var WEB_HOST = null;
var PRODUCT_HOST = null;


WHICH_HOST = hostDetails.loc;
DEPLOYED_HOST = deployedHostDetails.loc;
MAGENTO_HOST = MagentohostDetails.loc;
WEB_HOST = webHostDetails.loc;
PRODUCT_HOST = productHostDetails.loc;

exports.WHICH_HOST = WHICH_HOST;
exports.DEPLOYED_HOST = DEPLOYED_HOST;
exports.MAGENTO_HOST = MAGENTO_HOST;
exports.WEB_HOST = WEB_HOST;
exports.PRODUCT_HOST = PRODUCT_HOST;

//Object that represent TomCat hosts, port for all environments.
var tomcatHostDetails = {
	"loc": {
		"host": "http://tomcat.stg.msupply.com",
		"port": "80"
	}
}

var HOST = null;			//variable which holds the host and port of existing Tomcat environment.

	HOST = tomcatHostDetails.loc;


exports.HOST = HOST;
