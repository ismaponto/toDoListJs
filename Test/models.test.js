const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UserModel = require('../Server/models/userModel');

// POST /users/register - Register a new user
router.post('/register', async(req, res) => {
    try {
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

        // Respond with the new user data and the JWT token
        res.status(201).json({ id: userId, username, email, token });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /users/login - User login
router.post('/login', async(req, res) => {
    try {
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

        // Respond with the success message and the JWT token
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;