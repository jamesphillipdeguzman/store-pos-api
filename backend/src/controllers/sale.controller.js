import mongoose from 'mongoose';
import {
  findAllSales,
  findSaleById,
  findSalesByUserId,
  findSalesByCustomerId,
  createSale,
  updateSaleById,
  deleteSaleById,
} from '../services/sale.service.js';

export const getSales = async (req, res) => {
  try {
    const sales = await findAllSales();
    if (!sales || sales.length === 0) {
      return res.status(404).send({ error: 'No sales found.' });
    }
    console.log('GET /api/sales was called.');
    return res.status(200).json({ sales });
  } catch (error) {
    console.error('Error fetching sales:', error);
    return res
      .status(500)
      .send({ error: 'An error occurred while fetching sales.' });
  }
};

export const getSaleById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid sale ID format.' });
  }
  try {
    const sale = await findSaleById(id);
    if (!sale) {
      return res.status(404).send({ error: 'Sale not found.' });
    }
    console.log(`GET /api/sales/${id} was called.`);
    return res.status(200).json(sale);
  } catch (error) {
    console.error(`Error fetching sale with ID ${id}:`, error);
    return res
      .status(500)
      .send({ error: 'An error occurred while fetching the sale.' });
  }
};

export const getSalesByUserId = async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({ error: 'Invalid user ID format.' });
  }
  try {
    const sales = await findSalesByUserId(userId);
    if (!sales || sales.length === 0) {
      return res.status(404).send({ error: 'No sales found.' });
    }
    console.log(`[SALE] GET /api/sales/user/${userId} was called.`);
    return res.status(200).json(sales);
  } catch (error) {
    console.error(`Error fetching sales for user ID ${userId}:`, error);
    return res
      .status(500)
      .send({ error: 'An error occurred while fetching sales.' });
  }
};

export const getSalesByCustomerId = async (req, res) => {
  const { customerId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(customerId)) {
    return res.status(400).send({ error: 'Invalid customer ID format.' });
  }
  try {
    const sales = await findSalesByCustomerId(customerId);
    if (!sales || sales.length === 0) {
      return res.status(404).send({ error: 'No sales found.' });
    }
    console.log(`[SALE] GET /api/sales/customer/${customerId} was called.`);
    return res.status(200).json(sales);
  } catch (error) {
    console.error(`Error fetching sales for customer ID ${customerId}:`, error);
    return res
      .status(500)
      .send({ error: 'An error occurred while fetching sales.' });
  }
};

export const postSale = async (req, res) => {
  try {
    const saleData = req.body;

    const newSale = await createSale(saleData);
    if (!newSale) {
      return res.status(400).send({ error: 'Failed to create sale.' });
    }
    console.log('[SALE] POST /api/sales was called.');
    return res.status(201).json(newSale);
  } catch (error) {
    console.error('Error creating sale:', error);
    return res
      .status(500)
      .send({ error: 'An error occurred while creating the sale.' });
  }
};

export const updateSale = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid sale ID format.' });
  }
  try {
    const updatedSale = await updateSaleById(id, req.body);
    if (!updatedSale) {
      return res.status(404).send({ error: 'Sale not found.' });
    }
    console.log(`[SALE] PUT /api/sales/${id} was called.`);
    return res.status(200).json(updatedSale);
  } catch (error) {
    console.error(`Error updating sale with ID ${id}:`, error);
    return res
      .status(500)
      .send({ error: 'An error occurred while updating the sale.' });
  }
};

export const deleteSale = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid sale ID format.' });
  }
  try {
    const deletedSale = await deleteSaleById(id);
    if (!deletedSale) {
      return res.status(404).send({ error: 'Sale not found.' });
    }
    console.log(`[SALE] DELETE /api/sales/${id} was called.`);
    return res
      .status(200)
      .json({ message: `Sale with id ${id} deleted successfully.` });
  } catch (error) {
    console.error(`Error deleting sale with ID ${id}:`, error);
    return res
      .status(500)
      .send({ error: 'An error occurred while deleting the sale.' });
  }
};
