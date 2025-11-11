const express = require('express');
const mongoose = require('mongoose');
const { limiter, compression, securityHeaders } = require('./middleware/monitoring');
const connectDB = require('./config/database');

require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Monitoring and security middleware
app.use(limiter);
app.use(compression);
app.use(securityHeaders);

// ... rest of your middleware and routes

// Metrics endpoint
app.get('/metrics', (req, res) => {
  const metrics = {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  };
  res.json(metrics);
});

module.exports = app;