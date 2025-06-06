import express from 'express';
<<<<<<< HEAD
import * as saleController from '../controllers/sale.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Get all sales
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: List of all sales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sale'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/', saleController.getAllSales);

/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     summary: Get sale by ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Sale ID
 *     responses:
 *       200:
 *         description: Sale details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/:id', saleController.getSaleById);

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Create a new sale
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *               - totalAmount
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product
 *               customerId:
 *                 type: string
 *                 description: ID of the customer
 *               userId:
 *                 type: string
 *                 description: ID of the user (cashier)
 *               quantity:
 *                 type: number
 *                 description: Quantity of products sold
 *               totalAmount:
 *                 type: number
 *                 description: Total amount of the sale
 *               paymentMethod:
 *                 type: string
 *                 enum: [cash, credit, debit, paypal, gcash]
 *                 default: cash
 *     responses:
 *       201:
 *         description: Sale created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sale created successfully
 *                 saleId:
 *                   type: string
 *                   example: 60d21b4667d0d8992e610c85
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post('/', saleController.createSale);

/**
 * @swagger
 * /api/sales/{id}:
 *   put:
 *     summary: Update sale by ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Sale ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               customerId:
 *                 type: string
 *               userId:
 *                 type: string
 *               quantity:
 *                 type: number
 *               totalAmount:
 *                 type: number
 *               paymentMethod:
 *                 type: string
 *                 enum: [cash, credit, debit, paypal, gcash]
 *     responses:
 *       200:
 *         description: Sale updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sale updated successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put('/:id', saleController.updateSale);

/**
 * @swagger
 * /api/sales/{id}:
 *   delete:
 *     summary: Delete sale by ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Sale ID
 *     responses:
 *       200:
 *         description: Sale deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sale deleted successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete('/:id', saleController.deleteSale);
=======
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
>>>>>>> main

export default router;