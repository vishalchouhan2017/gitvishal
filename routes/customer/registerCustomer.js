var TAG = 'registerCustomer.js';
var dbConfig = require('../../Environment/mongoDatabase.js');
var customerInput = require('./config/inputConfig.js');
var customerConstant = require('./config/constant.js');

exports.registerCustomer = function(req, callback) {
    try {
        var db = dbConfig.mongoDbConn;
        var input = new customerInput.registerCustomer();
        input.firstName = req.body.firstName;
        input.lastName = req.body.lastName;
        input.mobile = req.body.mobile;
        input.email = req.body.email;
        input.address = req.body.address;

        var customerColl = db.collection(customerConstant.customerDbName);

        customerColl.insert(input, function(err, results) {
            if (err) {
                resJson = {
                    "http_code": "500",
                    "message": "Db error !"
                };
                return callback(false, resJson);
            } else {
                console.log(req.body);
                resJson = {
                    "http_code": "200",
                    "message": "customer Registerd"
                };
                return callback(false, resJson);
            }
        });
    } catch (e) {
        resJson = {
            "http_code": "500",
            "message": "Error retriving Advance Invoice details." + e.message
        };
        return callback(e, resJson);
    }
}