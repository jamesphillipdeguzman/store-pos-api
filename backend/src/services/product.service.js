import Product from '../models/product.model.js';

/**
 * Get all products
 * @returns {Promise<Array>} Array of all products
 */
export const findAllProducts = async () => {
  return Product.find();
};

/**
 * Get product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export const findProductById = async (id) => {
  return Product.findById(id);
};

/**
 * Create a new product
 * @param {Object} data - Product data
 * @returns {Promise<Object>} Created product
 */
export const createProduct = async (data) => {
  const product = new Product(data);
  return product.save();
};

/**
 * Update product by ID
 * @param {string} id - Product ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Update result
 */
export const updateProductById = async (id, updates) => {
  return Product.findByIdAndUpdate(id, updates, { new: true });
};

/**
 * Delete product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object>} Delete result
 */
export const deleteProductById = async (id) => {
  return Product.findByIdAndDelete(id);
};
