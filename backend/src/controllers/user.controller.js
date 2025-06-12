import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import {
  findAllUsers,
  findUserById,
  findUserByEmail,
  createUser as createUserService,
  updateUserById as updateUserByIdService,
  deleteUserById as deleteUserByIdService,
} from '../services/user.service.js';

import jwt from 'jsonwebtoken';

/**
 * @route GET /api/users
 * @desc Fetch all users
 */

export const getUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'No users found.' });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log('Error fetching users:', error);
    return res
      .status(500)
      .json({ error: 'An error occurred while fetching users.' });
  }
};

/**
 * @route GET /api/users/:id
 * @desc Fetch a user by ID
 */

export const getUserById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid user ID format.' });
  }
  try {
    const user = await findUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(`Error fetching user with ID ${id}:`, error);
    return res
      .status(500)
      .json({ error: 'An error occurred while fetching the user.' });
  }
};

/**
 * @route GET /api/users/email
 * @desc Fetch a user by email
 */

export const getUserByEmail = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ error: 'Email parameter is required' });
  }
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(`Error fetching user with email ${email}:`, error);
    return res
      .status(500)
      .json({ error: 'An error occurred while fetching the user.' });
  }
};

/**
 * @route POST /api/users
 * @desc Create a new user
 */

export const postUser = async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await createUserService(userData);
    if (!newUser) {
      return res.status(400).json({ error: 'Failed to create user.' });
    }
    return res.status(201).json(newUser);
  } catch (error) {
    console.log('Error creating user:', error);
    return res
      .status(500)
      .json({ error: 'An error occurred while creating the user.' });
  }
};

/**
 * @route PUT /api/users/:id
 * @desc Update a user by ID
 */

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid user ID format.' });
  }
  try {
    const updatedUser = await updateUserByIdService(id, updates);
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(`Error updating user with ID ${id}:`, error);
    return res
      .status(500)
      .json({ error: 'An error occurred while updating the user.' });
  }
};

/**
 * @route DELETE /api/users/:id
 * @desc Delete a user by ID
 */

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid user ID format.' });
  }
  try {
    const deletedUser = await deleteUserByIdService(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }
    return res.status(200).json({ message: `User ${id} deleted` });
  } catch (error) {
    console.log(`Error deleting user with ID ${id}:`, error);
    return res
      .status(500)
      .json({ error: 'An error occurred while deleting the user.' });
  }
};

/**
 * @route GET /api/users/profile
 * @desc Get currently logged-in user's profile
 */
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log('Error fetching user profile:', error);
    return res.status(500).json({ error: 'Failed to fetch user profile.' });
  }
};

/**
 * @route POST /api/users/signup
 * @desc Handle user signup
 */
export const userSignup = async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await createUserService(userData);
    return res.status(201).json({ created: true, user: newUser });
  } catch (error) {
    console.log('Error during user signup:', error);
    return res.status(500).json({ error: 'Signup failed.' });
  }
};

/**
 * @route POST /api/users/login
 * @desc Handle user login
 */
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // In a real app, you'd validate password and issue a JWT
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const payload = { _id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return res.status(200).json(token);
  } catch (error) {
    console.log('Login error:', error);
    return res.status(500).json({ error: 'Login failed.' });
  }
};

/**
 * @route POST /api/users/logout
 * @desc Handle user logout
 */
export const userLogout = async (req, res) => {
  try {
    // You might clear a cookie/token here in a real app
    return res.status(200).json({ logout: true });
  } catch (error) {
    console.log('Logout error:', error);
    return res.status(500).json({ error: 'Logout failed.' });
  }
};
