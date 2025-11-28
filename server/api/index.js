// Vercel serverless function handler
// This file is the entry point for Vercel serverless functions

// Import the Express app from server.js
// In Vercel mode, server.js exports just the app (not server)
const app = require("../server.js");

// Export the app as the serverless function handler
module.exports = app;
