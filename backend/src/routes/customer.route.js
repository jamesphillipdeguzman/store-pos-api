import express from 'express';

import {
  getCustomers,
  getCustomerById,
  postCustomer,
  updateCustomerById,
  deleteCustomerById,
} from '../controllers/customer.controller.js';

const router = express.Router();

// Get all customers
router.get('/', getCustomers);

// Get a customer by Id
router.get('/:id', getCustomerById);

// Create a new customer
router.post('/', postCustomer);

// Update a customer
router.put('/:id', updateCustomerById);

// Delete a customer
router.delete('/:id', deleteCustomerById);

export default router;
