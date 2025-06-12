import express from 'express';

import {
  getCustomers,
  getCustomerById,
  postCustomer,
  updateCustomerById,
  deleteCustomerById,
} from '../controllers/customer.controller.js';
import {
  validateCustomer,
  validateCustomerUpdate,
} from '../middlewares/customer.validation.middleware.js';

import { validateMongoIdParam } from '../middlewares/common.middleware.js';

const router = express.Router();

// Get all customers
router.get('/', getCustomers);

// Get a customer by Id
router.get('/:id', validateMongoIdParam, getCustomerById);

// Create a new customer
router.post('/', validateCustomer, postCustomer);

// Update a customer
router.put(
  '/:id',
  validateMongoIdParam,
  validateCustomerUpdate,
  updateCustomerById,
);

// Delete a customer
router.delete('/:id', validateMongoIdParam, deleteCustomerById);

export default router;
