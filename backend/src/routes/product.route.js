import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} from '../controllers/product.controller.js';
const router = express.Router();

// Get all products
/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get all products
 *    tags:
 *      - Products
 *    responses:
 *      200:
 *        description: A list of all products
 *      500:
 *        description: An error occurred while fetching products
 *
 */
router.get('/', getProducts);

// Get a product by Id
/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The unique ID of the product
 *    tags:
 *      - Products
 *    responses:
 *      200:
 *        description: The product with the specified ID
 *      400:
 *        description: Invalid product ID format
 *      404:
 *        description: Product not found
 *      500:
 *        description: An error occurred while fetching the product
 *
 */
router.get('/:id', getProductById);

// Create a new product
/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Create a new product
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    tags:
 *      - Products
 *    responses:
 *      201:
 *        description: A new product created
 *      400:
 *        description: Failed to create product
 *      500:
 *        description: An error occurred while creating the product
 *
 */
router.post('/', createProduct);

// Update a product by Id
/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Update a product by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The unique ID of the product
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    tags:
 *      - Products
 *    responses:
 *      200:
 *        description: Product updated
 *      400:
 *        description:  Invalid product ID format
 *      500:
 *        description: An error occurred while updating the product
 *
 */
router.put('/:id', updateProductById);

// Delete a product by Id
/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Deletes a product by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The unique ID of the product
 *    tags:
 *      - Products
 *    responses:
 *      200:
 *        description: Product was deleted successfully
 *      400:
 *        description: Invalid product ID format
 *      500:
 *        description: An error occurred while deleting the product
 */
router.delete('/:id', deleteProductById);

export default router;
