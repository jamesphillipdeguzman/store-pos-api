import mongoose from 'mongoose';
import {
  findAllSales,
  findSaleById,
  findSalesByUserId,
  findSalesByCustomerId,
  createSale as createSaleService,
  updateSaleById as updateSaleByIdService,
  deleteSaleById as deleteSaleByIdService,
} from '../services/sale.service.js';

/**
 * @route GET /api/sales
 * @desc Fetch all sales
 */

export const getSales = async (req, res) => {
  try {
    const sales = await findAllSales();
    if (!sales || sales.length === 0) {
      return res.status(404).json({ error: 'No sales found.' });
    }
    console.log('GET /api/sales was called.');
    return res.status(200).json({ sales });
  } catch (error) {
    console.error('Error fetching sales:', error);
    return res
      .status(500)
      .json({ error: 'An error occurred while fetching sales.' });
  }
};

/**
 * @route GET /api/sales/:id
 * @desc Fetch a sale by ID
 */

export const getSaleById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid sale ID format.' });
  }
  try {
    const sale = await findSaleById(id);
    if (!sale) {
      return res.status(404).json({ error: 'Sale not found.' });
    }
    console.log(`GET /api/sales/${id} was called.`);
    return res.status(200).json(sale);
  } catch (error) {
    console.error(`Error fetching sale with ID ${id}:`, error);
    return res
      .status(500)
      .json({ error: 'An error occurred while fetching the sale.' });
  }
};

/**
 * @route GET /api/sales/user/:userId
 * @desc Fetch all sales by userId
 */

export const getSalesByUserId = async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid user ID format.' });
  }
  try {
    const sales = await findSalesByUserId(userId);
    if (!sales || sales.length === 0) {
      return res.status(404).json({ error: 'No sales found.' });
    }
    console.log(`[SALE] GET /api/sales/user/${userId} was called.`);
    return res.status(200).json(sales);
  } catch (error) {
    console.error(`Error fetching sales for user ID ${userId}:`, error);
    return res
      .status(500)
      .json({ error: 'An error occurred while fetching sales.' });
  }
};

/**
 * @route GET /api/sales/customer/:customerId
 * @desc Fetch all sales by customerId
 */

export const getSalesByCustomerId = async (req, res) => {
  const { customerId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(customerId)) {
    return res.status(400).json({ error: 'Invalid customer ID format.' });
  }
  try {
    const sales = await findSalesByCustomerId(customerId);
    if (!sales || sales.length === 0) {
      return res.status(404).json({ error: 'No sales found.' });
    }
    console.log(`[SALE] GET /api/sales/customer/${customerId} was called.`);
    return res.status(200).json(sales);
  } catch (error) {
    console.error(`Error fetching sales for customer ID ${customerId}:`, error);
    return res
      .status(500)
      .json({ error: 'An error occurred while fetching sales.' });
  }
};

/**
 * @route POST /api/sales/
 * @desc Create a new sale
 */

export const postSale = async (req, res) => {
  try {
    const saleData = req.body;

    const newSale = await createSaleService(saleData);
    if (!newSale) {
      return res.status(400).json({ error: 'Failed to create sale.' });
    }
    console.log('[SALE] POST /api/sales was called.');
    return res.status(201).json(newSale);
  } catch (error) {
    console.error('Error creating sale:', error);
    return res
      .status(500)
      .json({ error: 'An error occurred while creating the sale.' });
  }
};

/**
 * @route PUT /api/sales/:id
 * @desc Update a sale
 */

export const updateSale = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid sale ID format.' });
  }
  try {
    const updatedSale = await updateSaleByIdService(id, req.body);
    if (!updatedSale) {
      return res.status(404).json({ error: 'Sale not found.' });
    }
    console.log(`[SALE] PUT /api/sales/${id} was called.`);
    return res.status(200).json(updatedSale);
  } catch (error) {
    console.error(`Error updating sale with ID ${id}:`, error);
    return res
      .status(500)
      .json({ error: 'An error occurred while updating the sale.' });
  }
};

/**
 * @route DELETE /api/sales/:id
 * @desc Delete a sale
 */

export const deleteSale = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid sale ID format.' });
  }
  try {
    const deletedSale = await deleteSaleByIdService(id);
    if (!deletedSale) {
      return res.status(404).json({ error: 'Sale not found.' });
    }
    console.log(`[SALE] DELETE /api/sales/${id} was called.`);
    return res.status(200).json({ message: `Sales ${id} deleted` });
  } catch (error) {
    console.error(`Error deleting sale with ID ${id}:`, error);
    return res
      .status(500)
      .json({ error: 'An error occurred while deleting the sale.' });
  }
};
