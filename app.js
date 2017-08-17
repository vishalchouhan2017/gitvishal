var http = require("http");

require("http").createServer(function(request, response){
  response.writeHeader(200, {"Content-Type": "text/plain"});
  response.write("Node js codeBase!");
  response.end();
  }).listen(8080);
  console.log('Listening on port 8080');
