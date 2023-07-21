const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mysql = require('mysql');
const dotenv = require('dotenv'); // Import dotenv

const app = express();
dotenv.config(); // Load environment variables from .env

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Cross-Origin Resource Sharing (CORS) middleware
app.use(cors());

// Security middleware
app.use(helmet());

// HTTP request logger middleware
app.use(morgan('combined'));



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

//gestionar sessions
app.use(
    session({
        secret: 'your_secret_key', // Clave secreta para firmar la cookie de sesión (cambia esto por un valor seguro)
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false, // Cambia esto a "true" si utilizas HTTPS
            maxAge: 3600000, // Tiempo de expiración de la cookie en milisegundos (1 hora en este caso)
        },
    })
);
// Define your routes here
// For example:
const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

// Example default route
app.get('/', (req, res) => {
    res.send('Hello, this is your Node.js server!');
});

// Route not found error handling
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});

module.exports = server; // Export the server for testing purposes