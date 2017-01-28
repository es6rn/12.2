 var PORT = 8090;       //端口
 var DIR = 'test1';     //用于存放html的目录
 
var fs=require('fs');
var options = {
    key: fs.readFileSync('./privatekey.pem'),
    cert: fs.readFileSync('./certificate.pem')
};

 var http = require('https');
 var url=require('url');
 
 var mine=require('./mine').types;
 var path=require('path');

 var server = http.createServer(options, function (request, response) {
    //var url=require('url');
    console.log('received request:' + request);
    for (var aName in request) {
                console.log('*property:name:'+aName);
                console.log('*property:'+request[aName]);
            }

    console.log('received request url :' + request.url);

     var pathname = url.parse(request.url).pathname;
     var realPath = path.join(DIR, pathname);
     //console.log(realPath);
     var ext = path.extname(realPath);
     ext = ext ? ext.slice(1) : 'unknown';
     fs.exists(realPath, function (exists) {
         if (!exists) {
             response.writeHead(404, {
                 'Content-Type': 'text/plain'
             });
 
             response.write("This request URL " + pathname + " was not found on this server.");
             response.end();
         } else {
             fs.readFile(realPath, "binary", function (err, file) {
                 if (err) {
                     response.writeHead(500, {
                         'Content-Type': 'text/plain'
                     });
                     response.end(err);
                 } else {
                     var contentType = mine[ext] || "text/plain";
                   response.writeHead(200, {
                       'Content-Type': contentType
                     });
                     response.write(file, "binary");
                     response.end();
                 }
             });
         }
     });
 });
 server.listen(PORT);
 console.log("Server runing at port: " + PORT + ".");