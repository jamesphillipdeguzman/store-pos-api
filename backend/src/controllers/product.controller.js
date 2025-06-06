import mongoose from 'mongoose';
import {
  findAllProducts,
  findProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} from '../services/product.service.js';

export const getProducts = async (req, res) => {
  try {
    const products = await findAllProducts();
    if (!products || products.length === 0) {
      return res.status(404).send({ error: 'No products found.' });
    }
    return res.status(200).json({ products: 'products placeholder' });
  } catch (error) {
    console.log('Error fetching products:', error);
    return res
      .status(500)
      .send({ error: 'An error occurred while fetching products.' });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid product ID format.' });
  }
  try {
    const product = await findProductById(id);
    if (!product) {
      return res.status(404).send({ error: 'Product not found.' });
    }
    return res
      .status(200)
      .json({ product: `product with id ${id} placeholder` });
  } catch (error) {
    console.log(`Error fetching product with ID ${id}:`, error);
    return res
      .status(500)
      .send({ error: 'An error occurred while fetching the product.' });
  }
};

export const postProduct = async (req, res) => {
  const productData = req.body;
  try {
    const newProduct = await createProduct(productData);
    if (!newProduct) {
      return res.status(400).send({ error: 'Failed to create product.' });
    }
    return res.status(201).json({ product: 'new product placeholder' });
  } catch (error) {
    console.log('Error creating product:', error);
    return res
      .status(500)
      .send({ error: 'An error occurred while creating the product.' });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid product ID format.' });
  }
  try {
    const updatedProduct = await updateProductById(id, updates);
    if (!updatedProduct) {
      return res.status(404).send({ error: 'Product not found.' });
    }
    return res
      .status(200)
      .json({ product: `updated product with id ${id} placeholder` });
  } catch (error) {
    console.log(`Error updating product with ID ${id}:`, error);
    return res
      .status(500)
      .send({ error: 'An error occurred while updating the product.' });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid product ID format.' });
  }
  try {
    const deletedProduct = await deleteProductById(id);
    if (!deletedProduct) {
      return res.status(404).send({ error: 'Product not found.' });
    }
    return res
      .status(200)
      .json({ message: `Product with id ${id} deleted successfully.` });
  } catch (error) {
    console.log(`Error deleting product with ID ${id}:`, error);
    return res
      .status(500)
      .send({ error: 'An error occurred while deleting the product.' });
  }
};
