import User from '../models/user.model.js';

/**
 * Get all users
 * @returns {Promise<Array>} Array of all users
 */
export const findAllUsers = async () => {
  return User.find().select('-password');
};

/**
 * Get user by ID
 * @param {string} id - User ID
 * @returns {Promise<Object>} User object
 */
export const findUserById = async (id) => {
  return User.findById(id).select('-password');
};

/**
 * Get user by email
 * @param {string} email - User email
 * @returns {Promise<Object>} User object
 */
export const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Create a new user
 * @param {Object} data - User data
 * @returns {Promise<Object>} Created user
 */
export const createUser = async (data) => {
  const user = new User(data);
  return user.save();
};

/**
 * Update user by ID
 * @param {string} id - User ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Update result
 */
export const updateUserById = async (id, updates) => {
  return User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
};

/**
 * Delete user by ID
 * @param {string} id - User ID
 * @returns {Promise<Object>} Delete result
 */
export const deleteUserById = async (id) => {
  return User.findByIdAndDelete(id);
};
