var http = require("http");

require("http").createServer(function(request, response){
  response.writeHeader(200, {"Content-Type": "text/plain"});
  response.write("Hello World!");
  response.end();
  console.log('Listening on port 8080');
}).listen(8080);
