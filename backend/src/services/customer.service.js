import Customer from '../models/customer.model.js';

/**
 * Get all customers
 * @returns {Promise<Array>} Array of all customers
 */
export const findAllCustomers = async () => {
  return Customer.find();
};

/**
 * Get customer by ID
 * @param {string} id - Customer ID
 * @returns {Promise<Object>} Customer object
 */
export const findCustomerById = async (id) => {
  return Customer.findById(id);
};

/**
 * Create a new customer
 * @param {Object} data - Customer data
 * @returns {Promise<Object>} Created customer
 */
export const createCustomer = async (data) => {
  const customer = new Customer(data);
  return customer.save();
};

/**
 * Update customer by ID
 * @param {string} id - Customer ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Update result
 */
export const updateCustomerById = async (id, updates) => {
  return Customer.findByIdAndUpdate(id, updates, { new: true });
};

/**
 * Delete customer by ID
 * @param {string} id - Customer ID
 * @returns {Promise<Object>} Delete result
 */
export const deleteCustomerById = async (id) => {
  return Customer.findByIdAndDelete(id);
};
