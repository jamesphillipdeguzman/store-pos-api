import express from 'express';

import {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUserById,
  deleteUserById,
} from '../controllers/user.controller.js';
import { validateUserUpdate, validateUserSignup } from '../middlewares/user.validation.middleware.js';

const router = express.Router();

// Get all users
router.get('/', getUsers);

// Get a user by Id
router.get('/:id', getUserById);

// Get a user by email
router.get('/email', getUserByEmail);

// Create a new user
router.post('/', validateUserSignup, createUser);

// Update a user by Id
router.put('/:id', validateUserUpdate, updateUserById);

// Delete a user by Id
router.delete('/:id', deleteUserById);

export default router;
