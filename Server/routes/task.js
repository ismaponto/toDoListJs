const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const TaskModel = require('../models/taskModel');

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

// POST /tasks/personal - Create a new personal task
router.post(
    '/personal',
    isAuthenticated,
    // Add validation middleware using express-validator
    [
        body('taskDescription').notEmpty().isString(),
        body('deadline').notEmpty().isString(), // You can add more specific validation for the deadline if needed
    ],
    async(req, res) => {
        try {
            // Validate request body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const { taskDescription, deadline } = req.body;
            const userId = req.session.userId; // Get the user ID from the session

            // Create a new personal task object
            const newPersonalTask = {
                userId,
                taskDescription,
                deadline,
                completed: false,
            };

            // Save the personal task to the database using TaskModel
            const taskId = await TaskModel.createPersonalTask(newPersonalTask);

            // Respond with the new personal task data
            res.status(201).json({ id: taskId, ...newPersonalTask });
        } catch (err) {
            console.error('Error creating personal task:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
);

// POST /tasks/group - Create a new group task
router.post(
    '/group',
    isAuthenticated,
    // Add validation middleware using express-validator
    [
        body('groupId').notEmpty().isString(),
        body('taskDescription').notEmpty().isString(),
        body('deadline').notEmpty().isString(), // You can add more specific validation for the deadline if needed
    ],
    async(req, res) => {
        try {
            // Validate request body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const { groupId, taskDescription, deadline } = req.body;
            const userId = req.session.userId; // Get the user ID from the session

            // Check if the user is a member of the group (Replace this with your actual group membership check)
            const isGroupMember = true; // Replace this with your logic to check if the user is a member of the group
            if (!isGroupMember) {
                return res.status(403).json({ error: 'You are not a member of the group' });
            }

            // Create a new group task object
            const newGroupTask = {
                groupId,
                taskDescription,
                deadline,
                completed: false,
            };

            // Save the group task to the database using TaskModel
            const taskId = await TaskModel.createGroupTask(newGroupTask);

            // Respond with the new group task data
            res.status(201).json({ id: taskId, ...newGroupTask });
        } catch (err) {
            console.error('Error creating group task:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
);

// ... (other task routes)

module.exports = router;