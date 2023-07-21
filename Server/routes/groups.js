const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const UserModel = require('../models/userModel');
const GroupModel = require('../models/groupModel');

// Middleware to verify user authentication
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        // If the user is authenticated, continue with the next route
        next();
    } else {
        // If the user is not authenticated, respond with an unauthorized error
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// POST /groups - Create a new group
router.post(
    '/',
    isAuthenticated,
    // Add validation middleware using express-validator
    [body('name').notEmpty().isString()],
    async(req, res) => {
        try {
            // Validate request body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const { name } = req.body;

            // Create a new group object
            const newGroup = {
                name,
                createdBy: req.session.userId, // Assuming req.session contains the authenticated user data
            };

            // Save the group to the database using GroupModel
            const groupId = await GroupModel.createGroup(newGroup);

            // Respond with the new group data
            res.status(201).json({ id: groupId, ...newGroup });
        } catch (err) {
            console.error('Error creating group:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
);

// GET /groups/:groupId - Get group by ID
router.get('/:groupId', isAuthenticated, async(req, res) => {
    try {
        const groupId = req.params.groupId;

        // Get the group from the database using GroupModel
        const group = await GroupModel.findGroupById(groupId);

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Check if the user is a member of the group (Replace this with your actual group membership check)
        const isGroupMember = true; // Replace this with your logic to check if the user is a member of the group

        if (!isGroupMember) {
            return res.status(403).json({ error: 'You are not a member of the group' });
        }

        // Respond with the group data
        res.json(group);
    } catch (err) {
        console.error('Error getting group:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ... (other group routes)

module.exports = router;