var static = require('node-static');
 
//
// Create a node-static server instance to serve the './public' folder
//
var fileServer = new static.Server('./Chapter 2/20220315/public');
 
require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response, function (e, res) {
            if (e && (e.status === 404)) { // If the file wasn't found
                fileServer.serveFile('/not-found.html', 404, {}, request, response);
            }
        });
    }).resume();
}).listen(8080);