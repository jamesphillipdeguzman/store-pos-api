import Sale from '../models/sale.model.js';

/**
 * Get all sales
 * @returns {Promise<Array>} Array of all sales
 */
export const findAllSales = async () => {
  return Sale.find()
    .populate('productId')
    .populate('customerId')
    .populate('userId');
};

/**
 * Get sale by ID
 * @param {string} id - Sale ID
 * @returns {Promise<Object>} Sale object
 */
export const findSaleById = async (id) => {
  return Sale.findById(id)
    .populate('productId')
    .populate('customerId')
    .populate('userId');
};

/**
 * Get all sales by a user (cashier/admin)
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of sales by user
 */
export const findSalesByUserId = async (userId) => {
  return Sale.find({ userId })
    .populate('productId')
    .populate('customerId')
    .populate('userId');
};

/**
 * Get all sales by a customer
 * @param {string} customerId - Customer ID
 * @returns {Promise<Array>} Array of sales by customer
 */
export const findSalesByCustomerId = async (customerId) => {
  return Sale.find({ customerId })
    .populate('productId')
    .populate('customerId')
    .populate('userId');
};

/**
 * Create a new sale record
 * @param {Object} data - Sale data
 * @returns {Promise<Object>} Created sale
 */
export const createSale = async (data) => {
  const sale = new Sale(data);
  return sale.save();
};

/**
 * Update sale by ID
 * @param {string} id - Sale ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Update result
 */
export const updateSaleById = async (id, updates) => {
  return Sale.findByIdAndUpdate(id, updates, { new: true });
};

/**
 * Delete sale by ID
 * @param {string} id - Sale ID
 * @returns {Promise<Object>} Delete result
 */
export const deleteSaleById = async (id) => {
  return Sale.findByIdAndDelete(id);
};
