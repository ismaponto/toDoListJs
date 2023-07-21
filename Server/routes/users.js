const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const UserModel = require('../models/userModel');

// Middleware para verificar la autenticación del usuario
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        // Si el usuario ha iniciado sesión, continúa con la siguiente ruta
        next();
    } else {
        // Si el usuario no ha iniciado sesión, responde con un error de no autorizado
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// POST /users/register - Register a new user
router.post(
    '/register',
    // Add validation middleware using express-validator
    [
        body('username').notEmpty().isString(),
        body('email').notEmpty().isEmail(),
        body('password').notEmpty().isString().isLength({ min: 6 }),
    ],
    async(req, res) => {
        try {
            // Validate request body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const { username, email, password } = req.body;

            // Check if the user already exists in the database
            const existingUser = await UserModel.findUserByUsername(username);
            if (existingUser) {
                return res.status(400).json({ error: 'Username already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user object
            const newUser = {
                username,
                email,
                password: hashedPassword,
            };

            // Save the user to the database using UserModel
            const userId = await UserModel.createUser(newUser);

            // Create a JWT token for the user (Replace this with your actual secret and expiration time)
            const token = jwt.sign({ id: userId }, 'your_secret_key', { expiresIn: '1h' });

            // Save information to session
            req.session.userId = userId;
            req.session.username = username;

            // Respond with the new user data and the JWT token
            res.status(201).json({ id: userId, username, email, token });
        } catch (err) {
            console.error('Error registering user:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
);

// POST /users/login - User login
router.post(
    '/login',
    // Add validation middleware using express-validator
    [body('username').notEmpty().isString(), body('password').notEmpty().isString()],
    async(req, res) => {
        try {
            // Validate request body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const { username, password } = req.body;

            // Find the user by their username in the database
            const user = await UserModel.findUserByUsername(username);
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Compare the provided password with the hashed password
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Create a JWT token for the user (Replace this with your actual secret and expiration time)
            const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });

            // Save information to session
            req.session.userId = user.id;
            req.session.username = user.username;

            // Respond with the success message and the JWT token
            res.status(200).json({ message: 'Login successful', token });
        } catch (err) {
            console.error('Error logging in:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
);

// POST /users/logout - User logout
router.post('/logout', isAuthenticated, async(req, res) => {
    // Destroy the user session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ message: 'Logout successful' });
        }
    });
});

// GET /users/me - Get user profile
router.get('/me', isAuthenticated, async(req, res) => {
    // Get the user from the session
    const user = await UserModel.findUserById(req.session.userId);

    // Respond with the user profile
    res.json(user);
});

module.exports = router;