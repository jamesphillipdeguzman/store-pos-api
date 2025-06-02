import express from 'express';

const router = express.Router();

// Get all sales
router.get('/');

// Get a sale by Id
router.get('/:id');

// Create a new sale
router.post('/');

// Update a sale by Id
router.put('/:id');

// Delete a sale by Id
router.delete('/:id');

export default router;
