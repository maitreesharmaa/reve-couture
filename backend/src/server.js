// src/server.js

require('dotenv').config();
const http = require('http');
const app = require('./app');
// This now correctly imports the function as 'connectDatabase'
const { connectDatabase } = require('./config/db'); 

const PORT = process.env.PORT || 5001; // Using 5001 as confirmed in your logs

async function start() {
    try {
        console.log('Connecting to database...');
        // This now calls the correctly named imported function
        await connectDatabase(); 
        console.log('Database connected successfully');

        const server = http.createServer(app);
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        server.on('error', (error) => {
            console.error('Server error:', error);
            process.exit(1);
        });
    } catch (err) {
        console.error('Failed to start the server:', err);
        console.error('Stack trace:', err.stack);
        process.exit(1);
    }
}

start();