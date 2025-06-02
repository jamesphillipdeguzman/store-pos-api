import express from 'express';

const router = express.Router();

// Get all customers
router.get('/');

// Get a customer by Id
router.get('/:id');

// Create a new customer
router.post('/');

// Update a customer
router.put('/:id');

// Delete a customer
router.delete('/:id');

export default router;
