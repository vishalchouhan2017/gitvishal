var TAG = 'Customer.js';
var dbConfig = require('../../Environment/mongoDatabase.js');
var crypto = require('crypto');
var customerInput = require('./config/inputConfig.js');
var customerConstant = require('./config/constant.js');

exports.registerCustomer = function(req, callback) {
    try {

        if (!req.body.mobile || req.body.mobile == undefined || !req.body.email || req.body.email == undefined) {
            resJson = {
                "http_code": "500",
                "message": "mobile and email mandatory"
            };
            return callback(false, resJson);
        }
        var passwordHash = crypto.createHash('md5').update(req.body.password).digest('hex');
       
        var db = dbConfig.mongoDbConn;
        var input = new customerInput.registerCustomer();
        input.firstName = req.body.firstName;
        input.lastName = req.body.lastName;
        input.mobile = req.body.mobile;
        input.email = req.body.email;
        input.address = req.body.address;
        input.userType = req.body.userType;
        input.password = passwordHash;
       
        var customerColl = db.collection(customerConstant.customerDbName);

        customerColl.insert(input, function(err, results) {
            if (err) {
                if (err.code == 11000) {
                    resJson = {
                        "http_code": "500",
                        "message": "mobile/email already registerd"
                    };
                    return callback(false, resJson);
                }else{
                    resJson = {
                        "http_code": "500",
                        "message": "Db error !"
                    };
                    return callback(false, resJson);
                }
            } else {
                resJson = {
                    "http_code": "200",
                    "message": "customer Registerd successfully"
                };
                return callback(false, resJson);
            }
        });
    } catch (e) {
        resJson = {
            "http_code": "500",
            "message": "Error retriving customer details." + e.message
        };
        return callback(e, resJson);
    }
}

exports.viewCustomer = function(req, callback) {
    try {
        if (!req.body.mobile || req.body.mobile == undefined ) {
            resJson = {
                "http_code": "500",
                "message": "mobile number mandatory"
            };
            return callback(false, resJson);
        }
        if (!req.body.password || req.body.password == undefined ) {
            resJson = {
                "http_code": "500",
                "message": "password  mandatory"
            };
            return callback(false, resJson);
        }

        var passwordHash = crypto.createHash('md5').update(req.body.password).digest('hex');

        var db = dbConfig.mongoDbConn;
        var input = new customerInput.viewCustomer();
        input.mobile = req.body.mobile;
        input.password = passwordHash;
        var customerColl = db.collection(customerConstant.customerDbName);
        
     
        customerColl.find({"mobile":input.mobile,"password":input.password}).toArray (function(err, result) {
            if (err) {
                resJson = {
                    "http_code": "500",
                    "message": "Db error !"
                };
                return callback(false, resJson);
            } 
            if (!result.length) {
                resJson = {
                  "http_code": "404",
                  "message": "mobile number and password not match"
                };
                return callback(false, resJson);
             }else {
                resJson = {
                    "http_code": "200",
                    "message": result[0]
                };
                return callback(false, resJson);
            }
        });
    } catch (e) {
        resJson = {
            "http_code": "500",
            "message": "Error retriving customer details." + e.message
        };
        return callback(e, resJson);
    }
}


exports.removeCustomer = function(req, callback) {
    try {
        if (!req.body.mobile || req.body.mobile == undefined ) {
            resJson = {
                "http_code": "500",
                "message": "mobile number mandatory"
            };
            return callback(false, resJson);
        }

        var db = dbConfig.mongoDbConn;
        var input = new customerInput.viewCustomer();
        input.mobile = req.body.mobile;
       
        var customerColl = db.collection(customerConstant.customerDbName);

        customerColl.remove(input,1, function(err, results) {
            if (err) {
                resJson = {
                    "http_code": "500",
                    "message": "Db error !"
                };
                return callback(false, resJson);
            } else {
                resJson = {
                    "http_code": "200",
                    "message": "customer removed successfully"
                };
                return callback(false, resJson);
            }
        });
    } catch (e) {
        resJson = {
            "http_code": "500",
            "message": "Error retriving customer details." + e.message
        };
        return callback(e, resJson);
    }
}

exports.updateCustomer = function(req, callback) {
    try {
        var db = dbConfig.mongoDbConn;
        var input = new customerInput.viewCustomer();
        input.mobile = req.body.mobile;
        
        var querobj = {};
        querobj["mobile"] = input.mobile;

        var updateObj = {};
      
        if(req.body.firstName != req.body.newFirstName){
           updateObj["firstName"] = req.body.newFirstName;
        }else
        {
            updateObj["firstName"] = req.body.firstName;
        }
        if(req.body.lastName != req.body.newLastName){
            updateObj["lastName"] = req.body.newLastName;
        }else{
            updateObj["lastName"] = req.body.lastName;
        }
        if(req.body.mobile != req.body.newMobile){
            updateObj["mobile"] = req.body.newMobile;
        }else{
            updateObj["mobile"] = req.body.mobile;
        }
        if(req.body.email != req.body.newEmail){
            updateObj["email"] = req.body.newEmail;
        }else{
            updateObj["email"] = req.body.email;
        }
        if(req.body.address != req.body.newAddress){
            updateObj["address"] = req.body.newAddress;
        }else{
            updateObj["address"] = req.body.address;
        }
        if(req.body.userType != req.body.newUserType){
            updateObj["userType"] = req.body.newUserType;
        }else{
            updateObj["userType"] = req.body.userType;
        }
       
        var customerColl = db.collection(customerConstant.customerDbName);

        customerColl.update(querobj,{ $set : updateObj}, function(err, result) {
            if (err) {
                resJson = {
                    "http_code": "500",
                    "message": "Db error !"
                };
                return callback(false, resJson);
            } else {
                resJson = {
                    "http_code": "200",
                    "message": "customer details updated successfully"
                };
                return callback(false, resJson);
            }
        });
    } catch (e) {
        resJson = {
            "http_code": "500",
            "message": "Error retriving customer details." + e.message
        };
        return callback(e, resJson);
    }
}

exports.updatePassword = function(req, callback) {
    try {
        if (!req.body.mobile || req.body.mobile == undefined 
            ||!req.body.password || req.body.password == undefined  ) {
            resJson = {
                "http_code": "500",
                "message": "mobile/password number mandatory"
            };
            return callback(false, resJson);
        }
        var passwordHash = crypto.createHash('md5').update(req.body.password).digest('hex');
        
        var db = dbConfig.mongoDbConn;
        var input = new customerInput.viewCustomer();
        input.mobile = req.body.mobile;
        input.password = passwordHash;
        
        var querobj = {};
        querobj["mobile"] = input.mobile;

        var updateObj = {};
      
        if(req.body.password != req.body.password){
           updateObj["password"] = req.body.password;
        }
        console.log(JSON.stringify(querobj));
        console.log(JSON.stringify(updateObj));
       
        var customerColl = db.collection(customerConstant.customerDbName);

        customerColl.update(querobj,{ $set : updateObj}, function(err, result) {
            if (err) {
                resJson = {
                    "http_code": "500",
                    "message": "Db error !"
                };
                return callback(false, resJson);
            } else {
                resJson = {
                    "http_code": "200",
                    "message": "password updated successfully"
                };
                return callback(false, resJson);
            }
        });
    } catch (e) {
        resJson = {
            "http_code": "500",
            "message": "Error retriving customer details." + e.message
        };
        return callback(e, resJson);
    }
}
