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
router.get('/', getUsers);

// Get a user by email (placed before :id route to avoid misinterpeting email as ID)
router.get('/email', validateEmailQuery, getUserByEmail);

// Get user profile
router.get('/profile', hybridAuth, getUserProfile);

// Signup/Login/Logout
router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/logout', userLogout);

// Get a user by Id
router.get('/:id', validateMongoIdParam, getUserById);

// Create a new user
router.post('/', validateUserSignup, postUser);

// Update a user by Id
router.put('/:id', validateMongoIdParam, validateUserUpdate, updateUser);

// Delete a user by Id
router.delete('/:id', validateMongoIdParam, deleteUser);

export default router;
