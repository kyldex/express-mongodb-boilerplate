const express = require('express');
const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_ADDRESS>/<COLLECTION_NAME>?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.log('Connection to MongoDB failed'));

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

// Global middleware as well.
// Handle requests with application/json Content-Type and set req.body
app.use(express.json());

module.exports = app;
