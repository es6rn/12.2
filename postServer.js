var http = require("http");
var url = require("url");
function start(route, handle) {
	function onRequest(request, response) {
		function route(handle, pathname, response, postData) {
			console.log("About to route a request for " + pathname);
			response.writeHead(200, {"Content-Type": "text/plain"});
			//response.write("You've sent the text: "+ querystring.parse(postData).text);
			response.write("{\"error\":0}");
			response.end();
			/*
			if (typeof handle[pathname] === 'function') {
				handle[pathname](response, postData);
			}
			else {
				console.log("No request handler found for " + pathname);
			  	response.writeHead(404, {"Content-Type": "text/plain"});
			  	response.write("404 Not found");
			  	response.end();
			}
			*/
		}
  		var postData = "";
  		var pathname = url.parse(request.url).pathname;
  		console.log("Request for " + pathname + " received.");
  		request.setEncoding("utf8");
  		request.addListener("data", function(postDataChunk) {
	   		postData += postDataChunk;
   			console.log("Received POST data chunk '"+ postDataChunk + "'.");
  		});
  		request.addListener("end", function() {
   			route(handle, pathname, response, postData);
  		});
 	}
 	http.createServer(onRequest).listen(8888); 
}
console.log("Server has started on port 8888.");
start();