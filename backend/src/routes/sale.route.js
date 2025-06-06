import express from 'express';
import {
  getSales,
  getSaleById,
  getSalesByUserId,
  getSalesByCustomerId,
  createSale,
  updateSaleById,
  deleteSaleById,
} from '../controllers/sale.controller.js';
const router = express.Router();

// Get all sales
/**
 * @swagger
 * /api/sales:
 *  get:
 *    summary: Get all sales
 *    tags:
 *      - Sales
 *    responses:
 *      200:
 *        description: A list of all sales
 *      500:
 *        description: An error occurred while fetching sales
 *
 */
router.get('/', getSales);

// Get a sale by Id
/**
 * @swagger
 * /api/sales/{id}:
 *  get:
 *    summary: Get a sale by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The unique ID of the sale
 *    tags:
 *      - Sales
 *    responses:
 *      200:
 *        description: The sale with the specified ID
 *      400:
 *        description: Invalid sale ID format
 *      404:
 *        description: Sale not found
 *      500:
 *        description: An error occurred while fetching the sale
 *
 */
router.get('/:id', getSaleById);

// Get a sale by User Id
/**
 * @swagger
 * /api/sales/user/{userId}:
 *  get:
 *    summary: Get a sale by User ID
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *        description: The unique User ID of the sale
 *    tags:
 *      - Sales
 *    responses:
 *      200:
 *        description: A list of sales for the specified User ID
 *      400:
 *        description: Invalid sale ID format
 *      404:
 *        description: Sale not found
 *      500:
 *        description: An error occurred while fetching the sale by User ID
 *
 */
router.get('/user/:userId', getSalesByUserId);

// Get a sale by Customer Id
/**
 * @swagger
 * /api/sales/customer/{customerId}:
 *  get:
 *    summary: Get a sale by Customer ID
 *    parameters:
 *      - in: path
 *        name: customerId
 *        required: true
 *        schema:
 *          type: string
 *        description: The unique Customer ID of the sale
 *    tags:
 *      - Sales
 *    responses:
 *      200:
 *        description: A list of sales for the specified Customer ID
 *      400:
 *        description: Invalid sale ID format
 *      404:
 *        description: Sale not found
 *      500:
 *        description: An error occurred while fetching the sale by Customer ID
 *
 */
router.get('/customer/:customerId', getSalesByCustomerId);

// Create a new sale
/**
 * @swagger
 * /api/sales:
 *  post:
 *    summary: Create a new sale
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Sale'
 *    tags:
 *      - Sales
 *    responses:
 *      201:
 *        description: A new sale created
 *      400:
 *        description: Failed to create sale
 *      500:
 *        description: An error occurred while creating the sale
 *
 */
router.post('/', createSale);

// Update a sale by Id
/**
 * @swagger
 * /api/sales/{id}:
 *  put:
 *    summary: Update a sale by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The unique ID of the sale
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Sale'
 *    tags:
 *      - Sales
 *    responses:
 *      200:
 *        description: Sale updated
 *      400:
 *        description:  Invalid sale ID format
 *      500:
 *        description: An error occurred while updating the sale
 *
 */
router.put('/:id', updateSaleById);

// Delete a sale by Id
/**
 * @swagger
 * /api/sales/{id}:
 *  delete:
 *    summary: Deletes a sale by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The unique ID of the sale
 *    tags:
 *      - Sales
 *    responses:
 *      200:
 *        description: Sale was deleted successfully
 *      400:
 *        description: Invalid sale ID format
 *      500:
 *        description: An error occurred while deleting the sale
 */
router.delete('/:id', deleteSaleById);

export default router;
