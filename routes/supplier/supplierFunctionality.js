var TAG = 'Supplier.js';
var dbConfig = require('../../Environment/mongoDatabase.js');
var crypto = require('crypto');
var supplierInput = require('./config/inputConfig.js');
var supplierConstant = require('./config/constant.js');

exports.registerSupplier = function(req, callback) {
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
        var supplierColl = db.collection(supplierConstant.supplierDbName);
        var countersCol = db.collection(supplierConstant.counterDbName);

        countersCol.findAndModify({ _id: 'sellerId' },null, { $inc: { seq: 1 } }, {new: true}, function(err, result){
            if (err) {
                resJson = {
                    "http_code": "500",
                    "message": "DB eroor"
                };
                return callback(false, resJson);
            } else {

                var input = new supplierInput.registerSupplier();
                input.sellerId = result.value.seq;
                input.date = new Date();
                input.firstName = req.body.firstName;
                input.lastName = req.body.lastName;
                input.mobile = req.body.mobile;
                input.email = req.body.email;
                input.address = req.body.address;
                input.userType = req.body.userType;
                input.password = passwordHash;
        
                
        
                supplierColl.insert(input, function(err, results) {
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
                            "message": "supplier Registerd successfully"
                        };
                        return callback(false, resJson);
                    }
                });

            }
        });

       } catch (e) {
        resJson = {
            "http_code": "500",
            "message": "Error retriving supplier details." + e.message
        };
        return callback(e, resJson);
    }
}

exports.viewSupplier = function(req, callback) {
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

        var passwordHash = crypto.createHash('md5').update(req.body.password).digest('hex')

        var db = dbConfig.mongoDbConn;
        var input = new supplierInput.viewSupplier();
        input.mobile = req.body.mobile;
        input.password = passwordHash;
        var supplierColl = db.collection(supplierConstant.supplierDbName);
     
        supplierColl.find({"mobile":input.mobile,"password":input.password}).toArray (function(err, result) {
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
            "message": "Error retriving supplier details." + e.message
        };
        return callback(e, resJson);
    }
}


exports.removeSupplier = function(req, callback) {
    try {
        if (!req.body.mobile || req.body.mobile == undefined ) {
            resJson = {
                "http_code": "500",
                "message": "mobile number mandatory"
            };
            return callback(false, resJson);
        }
        
        var db = dbConfig.mongoDbConn;
        var input = new supplierInput.viewSupplier();
        input.mobile = req.body.mobile;
       
        var supplierColl = db.collection(supplierConstant.supplierDbName);

        supplierColl.remove(input,1, function(err, results) {
            if (err) {
                resJson = {
                    "http_code": "500",
                    "message": "Db error !"
                };
                return callback(false, resJson);
            }if (!results.length) {
                resJson = {
                  "http_code": "404",
                  "message": "supplier data not found"
                };
                return callback(false, resJson);
             } else {
                resJson = {
                    "http_code": "200",
                    "message": "supplier removed successfully"
                };
                return callback(false, resJson);
            }
        });
    } catch (e) {
        resJson = {
            "http_code": "500",
            "message": "Error retriving supplier details." + e.message
        };
        return callback(e, resJson);
    }
}

exports.updateSupplier = function(req, callback) {
    try {
        var db = dbConfig.mongoDbConn;
        var input = new supplierInput.viewSupplier();
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
       
        var supplierColl = db.collection(supplierConstant.supplierDbName);

        supplierColl.update(querobj,{ $set : updateObj}, function(err, result) {
            if (err) {
                resJson = {
                    "http_code": "500",
                    "message": "Db error !"
                };
                return callback(false, resJson);
            }if (!result.length) {
                resJson = {
                  "http_code": "404",
                  "message": "supplier data not found"
                };
                return callback(false, resJson);
             } else {
                resJson = {
                    "http_code": "200",
                    "message": "supplier details updated successfully"
                };
                return callback(false, resJson);
            }
        });
    } catch (e) {
        resJson = {
            "http_code": "500",
            "message": "Error retriving supplier details." + e.message
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
        var input = new supplierInput.viewSupplier();
        input.mobile = req.body.mobile;
        input.password = passwordHash;
        
        var querobj = {};
        querobj["mobile"] = input.mobile;

        var updateObj = {};
      
        if(req.body.password != req.body.password){
           updateObj["password"] = req.body.password;
        }
       
        var supplierColl = db.collection(supplierConstant.supplierDbName);

        supplierColl.update(querobj,{ $set : updateObj}, function(err, result) {
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
            "message": "Error retriving supplier details." + e.message
        };
        return callback(e, resJson);
    }
}
