import mongoose from 'mongoose';
import {
  findAllUsers,
  findUserById,
  findUserByEmail,
  createUser,
  updateUserById,
  deleteUserById,
} from '../services/user.service.js';

export const getUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    if (!users || users.length === 0) {
      return res.status(404).send({ error: 'No users found.' });
    }
    return res.status(200).json({ users: 'users placeholder' });
  } catch (error) {
    console.log('Error fetching users:', error);
    return res
      .status(500)
      .send({ error: 'An error occurred while fetching users.' });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid user ID format.' });
  }
  try {
    const user = await findUserById(id);
    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }
    return res.status(200).json({ user: `user with id ${id} placeholder` });
  } catch (error) {
    console.log(`Error fetching user with ID ${id}:`, error);
    return res
      .status(500)
      .send({ error: 'An error occurred while fetching the user.' });
  }
};

export const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }
    return res
      .status(200)
      .json({ user: `user with email ${email} placeholder` });
  } catch (error) {
    console.log(`Error fetching user with email ${email}:`, error);
    return res
      .status(500)
      .send({ error: 'An error occurred while fetching the user.' });
  }
};

export const postUser = async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await createUser(userData);
    if (!newUser) {
      return res.status(400).send({ error: 'Failed to create user.' });
    }
    return res.status(201).json({ user: 'new user placeholder' });
  } catch (error) {
    console.log('Error creating user:', error);
    return res
      .status(500)
      .send({ error: 'An error occurred while creating the user.' });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid user ID format.' });
  }
  try {
    const updatedUser = await updateUserById(id, updates);
    if (!updatedUser) {
      return res.status(404).send({ error: 'User not found.' });
    }
    return res
      .status(200)
      .json({ user: `updated user with id ${id} placeholder` });
  } catch (error) {
    console.log(`Error updating user with ID ${id}:`, error);
    return res
      .status(500)
      .send({ error: 'An error occurred while updating the user.' });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid user ID format.' });
  }
  try {
    const deletedUser = await deleteUserById(id);
    if (!deletedUser) {
      return res.status(404).send({ error: 'User not found.' });
    }
    return res
      .status(200)
      .json({ message: `User with id ${id} deleted successfully.` });
  } catch (error) {
    console.log(`Error deleting user with ID ${id}:`, error);
    return res
      .status(500)
      .send({ error: 'An error occurred while deleting the user.' });
  }
};
