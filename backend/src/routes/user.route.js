import express from 'express';

import {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUserById,
  deleteUserById,
} from '../controllers/user.controller.js';
import {
  validateUserUpdate,
  validateUserSignup,
} from '../middlewares/user.validation.middleware.js';

import {
  validateMongoIdParam,
  validateEmailQuery,
} from '../middlewares/common.middleware.js';

const router = express.Router();

// Get all users
router.get('/', getUsers);

// Get a user by email (placed before :id route to avoid misinterpeting email as ID)
router.get('/email', validateEmailQuery, getUserByEmail);

// Get a user by Id
router.get('/:id', validateMongoIdParam, getUserById);

// Create a new user
router.post('/', validateUserSignup, createUser);

// Update a user by Id
router.put('/:id', validateMongoIdParam, validateUserUpdate, updateUserById);

// Delete a user by Id
router.delete('/:id', validateMongoIdParam, deleteUserById);

export default router;
