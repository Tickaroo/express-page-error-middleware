var path = require('path');
var express = require('express');
var errorMiddleware = require('../../');

module.exports = function(dev) {
  var app = express();
  app.set('view engine', 'jade');
  app.set('views', path.join(__dirname, 'views'));

  app.get('/', function(req, res) {
    throw new Error('some error');
  });

  app.get('/api_error', function(req, res, next) {
    setTimeout(function(){
      var myApiError = new Error('API error');
      myApiError.url = 'http://some.url';
      next(myApiError);
    }, 30);
  });

  app.get('/user/show', function(req, res) {
    res.send('<p>show happy user</p>')
  });

  app.get('/text', function(req, res) {
    var err = new Error('Access denied');
    throw 'denied';
  });

  app.use(errorMiddleware(dev ? 'error-dev.jade' : 'error.jade', true));

  return app;
}
