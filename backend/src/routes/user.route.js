import express from 'express';

import {
  getUsers,
  getUserById,
  getUserByEmail,
  postUser,
  updateUser,
  deleteUser,
  getUserProfile,
  userSignup,
  userLogin,
  userLogout,
} from '../controllers/user.controller.js';
import {
  validateUserUpdate,
  validateUserSignup,
} from '../middlewares/user.validation.middleware.js';

import {
  validateMongoIdParam,
  validateEmailQuery,
} from '../middlewares/common.middleware.js';

import { hybridAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Get all users
/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Get all users
 *    tags:
 *      - Users
 *    responses:
 *      200:
 *        description: A list of all users
 *      500:
 *        description: An error occurred while fetching users
 *
 */
router.get('/', hybridAuth, getUsers);

// Get a user by email (placed before :id route to avoid misinterpeting email as ID)
/**
 * @swagger
 * /api/users/email:
 *  get:
 *    summary: Get a user by email
 *    parameters:
 *      - in: query
 *        name: email
 *        required: true
 *        schema:
 *          type: string
 *        description: The email of the user
 *    tags:
 *      - Users
 *    responses:
 *      200:
 *        description: The user with the specified email
 *      400:
 *        description: Invalid email format
 *      404:
 *        description: User not found
 *      500:
 *        description: An error occurred while fetching the user
 *
 */
router.get('/email', hybridAuth, validateEmailQuery, getUserByEmail);

// Get user profile
/**
 * @swagger
 * /api/users/profile:
 *  get:
 *    summary: Get current user profile
 *    tags:
 *      - Users
 *    responses:
 *      200:
 *        description: The current user profile
 *      401:
 *        description: Unauthorized - User not authenticated
 *      500:
 *        description: An error occurred while fetching the user profile
 *
 */
router.get('/profile', hybridAuth, getUserProfile);

// Signup/Login/Logout
/**
 * @swagger
 * /api/users/signup:
 *  post:
 *    summary: Register a new user
 *    tags:
 *      - Authentication
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *              - name
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              name:
 *                type: string
 *    responses:
 *      201:
 *        description: User registered successfully
 *      400:
 *        description: Invalid input data
 *      500:
 *        description: An error occurred during registration
 *
 */
router.post('/signup', userSignup);

/**
 * @swagger
 * /api/users/login:
 *  post:
 *    summary: User login
 *    tags:
 *      - Authentication
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: Login successful
 *      400:
 *        description: Invalid credentials
 *      500:
 *        description: An error occurred during login
 *
 */
router.post('/login', userLogin);

/**
 * @swagger
 * /api/users/logout:
 *  post:
 *    summary: User logout
 *    tags:
 *      - Authentication
 *    responses:
 *      200:
 *        description: Logout successful
 *      500:
 *        description: An error occurred during logout
 *
 */
router.post('/logout', userLogout);

// Get a user by Id
/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    summary: Get a user by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The unique ID of the user
 *    tags:
 *      - Users
 *    responses:
 *      200:
 *        description: The user with the specified ID
 *      400:
 *        description: Invalid user ID format
 *      404:
 *        description: User not found
 *      500:
 *        description: An error occurred while fetching the user
 *
 */
router.get('/:id', hybridAuth, validateMongoIdParam, getUserById);

// Create a new user
/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: Create a new user
 *    tags:
 *      - Users
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *              - name
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              name:
 *                type: string
 *              role:
 *                type: string
 *                enum: [admin, user]
 *    responses:
 *      201:
 *        description: A new user created
 *      400:
 *        description: Failed to create user
 *      500:
 *        description: An error occurred while creating the user
 *
 */
router.post('/', hybridAuth, validateUserSignup, postUser);

// Update a user by Id
/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    summary: Update a user by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The unique ID of the user
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
 *              password:
 *                type: string
 *              role:
 *                type: string
 *                enum: [admin, user]
 *    tags:
 *      - Users
 *    responses:
 *      200:
 *        description: User updated
 *      400:
 *        description: Invalid user ID format
 *      404:
 *        description: User not found
 *      500:
 *        description: An error occurred while updating the user
 *
 */
router.put('/:id', hybridAuth, validateMongoIdParam, validateUserUpdate, updateUser);

// Delete a user by Id
/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    summary: Deletes a user by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The unique ID of the user
 *    tags:
 *      - Users
 *    responses:
 *      200:
 *        description: User was deleted successfully
 *      400:
 *        description: Invalid user ID format
 *      404:
 *        description: User not found
 *      500:
 *        description: An error occurred while deleting the user
 */
router.delete('/:id', hybridAuth, validateMongoIdParam, deleteUser);

export default router;
