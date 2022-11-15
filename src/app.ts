import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

import stuffRoutes from './routes/stuff';
import userRoutes from './routes/user';

const { DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, CLUSTER_ADDRESS } =
  process.env;

mongoose
  .connect(
    `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${CLUSTER_ADDRESS}/${DATABASE_NAME}?retryWrites=true&w=majority`
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
  next();
});

// Global middleware as well.
// Handle requests with application/json Content-Type and set req.body
app.use(express.json());

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

export default app;
