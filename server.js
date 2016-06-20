var http = require('http')
    var port = process.env.PORT || 3000;
    var host = process.env.HOST || '0.0.0.0';
    http.createServer(function(req, res) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World!\n'+'Server running at '+host+':'+port);
    }).listen(port, host);
   
