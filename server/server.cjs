const express = require('express');
const http = require('http');

const path = require('path');
const maintenanceRoutes = require('./dbs/postgres/maint_logs_routes.cjs')
const cors = require('cors');
const PORT = 5100;


const app = express();
//const server = http.createServer(app);
const server = http.createServer(app);

const corsOptions = {
  origin: '*', // Allow all origins (for development only; restrict in production)
  methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};



// Enable CORS for all routes
app.use(cors(corsOptions));
// This serves the built page (React Build)
app.use(express.static(path.join(__dirname, "build"))); 
//middleware to parse JSON
app.use(express.json());

//middleware to debug each request
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.use('/api/maintenanceLogs', maintenanceRoutes);

// Catch-all route for React routing (excluding static files)
/*
app.get("*", (req, res) => {
  // Check if the request is for a static file (e.g., JS or CSS)
 if (req.path.startsWith('/assets')) {
    return res.status(404).send('File not found');
 }
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
*/

// Start the server
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


