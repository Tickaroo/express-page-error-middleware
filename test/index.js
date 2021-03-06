var expect = require('chai').expect;
var Bluebird = require('bluebird');
var request = Bluebird.promisifyAll(require('supertest'));
var app = require('./fixture/app.js');

describe('express-page-error-middleware', function() {
  console.warn = function() {}; // dirty hack to hide console.warns produced by the middleware
  this.slow(200);

  it('should make express return 404', function() {
    this.slow(1000);
    return request(app())
      .get('/page-that-does-not-exist')
      .expect(404)
      .endAsync()
      .then(function(res) {
        expect(res.text).to.equal('<p>404</p><p>Not Found</p>');
      });
  });

  it('should return error template for `new Error()`', function() {
    return request(app())
      .get('/')
      .expect(500)
      .endAsync()
      .then(function(res) {
        expect(res.text).to.contain('some error');
      });
  });

  it('should return error template for `throw string`', function() {
    return request(app())
      .get('/text')
      .expect(500)
      .endAsync()
      .then(function(res) {
        expect(res.text).to.equal('<p>500</p><p>denied</p>');
      });
  });

  it('should fall through', function() {
    return request(app())
      .get('/user/show')
      .expect(200)
      .endAsync()
      .then(function(res) {
        expect(res.text).to.contain('<p>show happy user</p>');
      });
  });

  it('should display error stack', function() {
    return request(app('error-dev.jade'))
      .get('/')
      .expect(500)
      .endAsync()
      .then(function(res) {
        expect(res.text).to.contain('test/fixture/app.js:11:11');
      });
  });

  it('should display url', function() {
    return request(app('error-dev.jade'))
      .get('/api_error')
      .expect(500)
      .endAsync()
      .then(function(res) {
        expect(res.text).to.contain('<pre>http://some.url</pre>');
      });
  });

  it('should display only "ERROR" on broken templates', function() {
    return request(app('missing-error-template.jade'))
      .get('/api_error')
      .expect(500)
      .endAsync()
      .then(function(res) {
        expect(res.text).to.equal('ERROR');
      });
  });
});
