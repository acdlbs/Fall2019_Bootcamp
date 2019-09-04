/*
  Aiden Dowell
  CEN3031
  08/25/19
*/

// variables
var http = require("http"),
  fs = require("fs"),
  url = require("url"),
  port = 8080;

var listingData, server;

// handles requests from browser
var requestHandler = function(request, response) {
  var pathName = url.parse(request.url).pathname;
  if (pathName == "/listings") {
    response.write(listingData);
    response.end();
  } else {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.write("Bad gateway error");
    response.end();
  }
};

// file system reads the json data and stores it in the listingData variable
// server is started as well
fs.readFile("listings.json", "utf8", function(err, data) {
  if (err) {
    throw err;
  }
  listingData = data;
  server = http.createServer(requestHandler);
  server.listen(port, function() {
    console.log("Server listening on: http://localhost:" + port);
  });
});
