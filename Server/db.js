const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env

// Database connection configuration using environment variables
const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Connect to the database
dbConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        process.exit(1); // Exit the application if there's an error
    } else {
        console.log('Connected to the database.');
    }
});

module.exports = dbConnection;