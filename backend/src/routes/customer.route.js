import express from 'express';

import {
  getCustomers,
  getCustomerById,
  postCustomer,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customer.controller.js';
import {
  validateCustomer,
  validateCustomerUpdate,
} from '../middlewares/customer.validation.middleware.js';

import { validateMongoIdParam } from '../middlewares/common.middleware.js';

const router = express.Router();

// Get all customers
/**
 * @swagger
 * /api/customers:
 *  get:
 *    summary: Get all customers
 *    tags:
 *      - Customers
 *    responses:
 *      200:
 *        description: A list of all customers
 *      500:
 *        description: An error occurred while fetching customers
 *
 */
router.get('/', hybridAuth, getCustomers);

// Get a customer by Id
/**
 * @swagger
 * /api/customers/{id}:
 *  get:
 *    summary: Get a customer by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The unique ID of the customer
 *    tags:
 *      - Customers
 *    responses:
 *      200:
 *        description: The customer with the specified ID
 *      400:
 *        description: Invalid customer ID format
 *      404:
 *        description: Customer not found
 *      500:
 *        description: An error occurred while fetching the customer
 *
 */
router.get('/:id', hybridAuth, validateMongoIdParam, getCustomerById);

// Create a new customer
/**
 * @swagger
 * /api/customers:
 *  post:
 *    summary: Create a new customer
 *    tags:
 *      - Customers
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - phone
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              phone:
 *                type: string
 *              address:
 *                type: string
 *    responses:
 *      201:
 *        description: A new customer created
 *      400:
 *        description: Failed to create customer
 *      500:
 *        description: An error occurred while creating the customer
 *
 */
router.post('/', hybridAuth, validateCustomer, postCustomer);

// Update a customer
/**
 * @swagger
 * /api/customers/{id}:
 *  put:
 *    summary: Update a customer by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The unique ID of the customer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              phone:
 *                type: string
 *              address:
 *                type: string
 *    tags:
 *      - Customers
 *    responses:
 *      200:
 *        description: Customer updated
 *      400:
 *        description: Invalid customer ID format
 *      404:
 *        description: Customer not found
 *      500:
 *        description: An error occurred while updating the customer
 *
 */
router.put(
  '/:id',
  hybridAuth,
  validateMongoIdParam,
  validateCustomerUpdate,
  updateCustomer,
);

// Delete a customer
/**
 * @swagger
 * /api/customers/{id}:
 *  delete:
 *    summary: Deletes a customer by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The unique ID of the customer
 *    tags:
 *      - Customers
 *    responses:
 *      200:
 *        description: Customer was deleted successfully
 *      400:
 *        description: Invalid customer ID format
 *      404:
 *        description: Customer not found
 *      500:
 *        description: An error occurred while deleting the customer
 */
router.delete('/:id', hybridAuth, validateMongoIdParam, deleteCustomer);

export default router;
