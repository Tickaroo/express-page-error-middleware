# express-page-error-middleware [![npm version](https://badge.fury.io/js/express-page-error-middleware.svg)](https://www.npmjs.com/package/express-page-error-middleware) [![Build Status](https://travis-ci.org/Tickaroo/express-page-error-middleware.svg?branch=master)](https://travis-ci.org/Tickaroo/express-page-error-middleware)

Error pages handling middleware for express

## Install

```bash
$ npm install --save express-page-error-middleware
```

## Usage

Below is a example of usage. [test/fixture/app.js](https://github.com/tickaroo/express-page-error-middleware/blob/master/test/fixture/app.js) also
have a similar example.

```javascript
var express = require('express');
var errorMiddleware = require('express-page-error-middleware');

var app = express();

// define your routes

// this will add a 404 error if the request is not handled before and render an error page
app.use(errorMiddleware('./templates/error.jade'));
```

## Template

Variables provided inside the template.

- `code` status code
- `detail` message
- `error` error object
- `stack` error stack
- `url` bind this e.g. while throwing an API error object `err.url = apiRequest.url`, to see what API url has caused it
