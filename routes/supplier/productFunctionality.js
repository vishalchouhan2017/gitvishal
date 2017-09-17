var TAG = 'productFunctionality.js';
var dbConfig = require('../../Environment/mongoDatabase.js');
var crypto = require('crypto');
var customerInput = require('./config/inputConfig.js');
var customerConstant = require('./config/constant.js');
var productConstant = require('../product/config/constant.js');
var productConfig = require('../product/config/config.js');


exports.insertProduct = function(req, callback) {
    try{    
        var db = dbConfig.mongoDbConn;
        var countersCol = db.collection(supplierConstant.counterDbName);
        
                countersCol.findAndModify({ _id: 'productId' },null, { $inc: { seq: 1 } }, {new: true}, function(err, result){
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
                
                        
                
                        
        
                    }
                });
        
       

    }catch(e){

    }
}