var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);
  if (parsedUrl.pathname == '/listings'){
  	response.write(listingData);
  	response.end();
  } else {
  	response.writeHead(404, {"Content-Type": "text/plain"});
  	response.write('Bad gateway error');
  	response.end();
  }
};

var server = http.createServer(requestHandler);

fs.readFile('listings.json', 'utf8', function(err, data) {
  if(err) throw err;
  listingData = data;
  
  server.listen(port, function() {
  	console.log('Server listening on: http://127.0.0.1:' + port);
  });
  
});
