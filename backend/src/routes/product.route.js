import express from 'express';

const router = express.Router();

// Get all products
router.get('/');

// Get a product by Id
router.get('/:id');

// Create a new product
router.post('/');

// Update a product by Id
router.put('/:id');

// Delete a product by Id
router.delete('/:id');

export default router;
