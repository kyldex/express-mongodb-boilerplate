const express = require('express');

const app = express();

// This middleware doesn't take an endpoint as
// first parameter. So it applies to all routes.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  // next();
  res.json({ message: 'server response ok' });
});

module.exports = app;
