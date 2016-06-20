var http = require('http');
var express = require('express');
var bodyParser  = require("body-parser");

 var app = express();
 var server = http.createServer(app);
 var value = 0;

 var port = process.env.PORT || 3000;
 var host = process.env.HOST || '0.0.0.0';
   /* http.createServer(function(req, res) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World!\n Server running at '+host+':'+port);
    }).listen(port, host);*/
   server.listen(port,function(){

   });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

   app.get('/',function(req,res){
   		res.writeHead(200, { 'Content-Type': 'application/json' });
      	res.end(JSON.stringify({data:"hello world!"}));
   });

    app.get('/getData',function(req,res){
   		res.writeHead(200, { 'Content-Type': 'application/json' });
      	res.end(JSON.stringify({data:"hello world! getData"}));
   });

    app.post('/add',function(req,res){
    	try{
    		var a = parseInt(req.body.a);
    		var b = parseInt(req.body.b);
    		res.json({'data':a+b});
    	}catch(ex){

    		res.json({data:ex+" in catch"});
    	}
    	

    });