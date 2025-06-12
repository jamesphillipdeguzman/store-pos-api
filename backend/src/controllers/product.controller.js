import mongoose from 'mongoose';
import {
  findAllProducts,
  findProductById,
  createProduct as createProductService,
  updateProductById as updateProductByIdService,
  deleteProductById as deleteProductByIdService,
} from '../services/product.service.js';

/**
 * @route GET /api/products
 * @desc Fetch all products
 */

export const getProducts = async (req, res) => {
  try {
    const products = await findAllProducts();
    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'No products found.' });
    }
    console.log('[PRODUCT] GET /api/products was called.');
    return res.status(200).json(products);
  } catch (error) {
    console.log('Error fetching products:', error);
    return res
      .status(500)
      .json({ error: 'An error occurred while fetching products.' });
  }
};

/**
 * @route GET /api/products/:id
 * @desc Fetch a product by ID
 */

export const getProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid product ID format.' });
  }
  try {
    const product = await findProductById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    console.log(`[PRODUCT] GET /api/products/${id} was called.`);
    return res.status(200).json(product);
  } catch (error) {
    console.log(`Error fetching product with ID ${id}:`, error);
    return res
      .status(500)
      .json({ error: 'An error occurred while fetching the product.' });
  }
};

/**
 * @route POST /api/products
 * @desc Create a new product
 */

export const postProduct = async (req, res) => {
  const productData = req.body;
  try {
    const newProduct = await createProductService(productData);
    if (!newProduct) {
      return res.status(400).json({ error: 'Failed to create product.' });
    }
    console.log('[PRODUCT] POST /api/products was called.');
    return res.status(201).json(newProduct);
  } catch (error) {
    console.log('Error creating product:', error);
    return res
      .status(500)
      .json({ error: 'An error occurred while creating the product.' });
  }
};

/**
 * @route PUT /api/products/:id
 * @desc Update a product by ID
 */

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid product ID format.' });
  }
  try {
    const updatedProduct = await updateProductByIdService(id, updates);
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    console.log(`[PRODUCT] PUT /api/products/${id} was called.`);
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(`Error updating product with ID ${id}:`, error);
    return res
      .status(500)
      .json({ error: 'An error occurred while updating the product.' });
  }
};

/**
 * @route DELETE /api/products/:id
 * @desc Delete a product by ID
 */

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid product ID format.' });
  }
  try {
    const deletedProduct = await deleteProductByIdService(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    console.log(`[PRODUCT] DELETE /api/products/${id} was called`);
    return res.status(200).json({ message: `Product ${id} deleted` });
  } catch (error) {
    console.log(`Error deleting product with ID ${id}:`, error);
    return res
      .status(500)
      .json({ error: 'An error occurred while deleting the product.' });
  }
};
