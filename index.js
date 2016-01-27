module.exports = function(template) {
  return [
    function(req, res, next) {
      var err = new Error();
      err.status = 404;
      err.message = 'Not Found';
      next(err);
    },
    function(err, req, res, next) {
      var detail;
      console.warn(err.stack);
      res.status(err.status || 500);
      detail = err.message || err.text || err.toString();
      res.render(template, {
        code: res.statusCode,
        url: err.url,
        stack: err.stack,
        error: err,
        detail: detail
      });
      next();
    }
  ];
};
