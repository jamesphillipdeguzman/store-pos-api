import express from 'express';

const router = express.Router();

// Get all users
router.get('/');

// Get a user by Id
router.get('/:id');

// Create a new user
router.post('/');

// Update a user by Id
router.put('/:id');

// Delete a user by Id
router.delete('/:id');

export default router;
