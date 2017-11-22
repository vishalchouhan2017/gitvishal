
var express = require('express');
var app = express();

var supplier1 = require('./routes/supplier/supplier1.js');
var order = ('./routes/supplier/order.js');

app.use('/supplier',supplier1);
app.use('/order',order);


app.listen(8083);
console.log('Listening on port 8083');
