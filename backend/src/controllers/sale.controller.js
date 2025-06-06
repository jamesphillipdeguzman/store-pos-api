import mongoose from 'mongoose';
import Sale from '../models/sale.model.js';

// Get all sales
export const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate('productId')
      .populate('customerId')
      .populate('userId');
    res.status(200).json(sales);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to fetch sales', error: error.message });
  }
};

// Get sale by ID
export const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id)
      .populate('productId')
      .populate('customerId')
      .populate('userId');

    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(sale);
  } catch (error) {
    if (error.message === 'Invalid sale ID' || error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid sale ID format' });
    }
    res
      .status(500)
      .json({ message: 'Failed to fetch sale', error: error.message });
  }
};

// Create new sale
export const createSale = async (req, res) => {
  try {
    const {
      productId,
      customerId,
      userId,
      quantity,
      totalAmount,
      paymentMethod,
    } = req.body;

    // Validation
    if (!productId || !quantity || !totalAmount) {
      return res
        .status(400)
        .json({ message: 'ProductId, quantity, and totalAmount are required' });
    }

    if (typeof quantity !== 'number' || quantity <= 0) {
      return res
        .status(400)
        .json({ message: 'Quantity must be a positive number' });
    }

    if (typeof totalAmount !== 'number' || totalAmount <= 0) {
      return res
        .status(400)
        .json({ message: 'Total amount must be a positive number' });
    }

    const sale = new Sale({
      productId,
      customerId,
      userId,
      quantity,
      totalAmount,
      paymentMethod: paymentMethod || 'cash',
    });

    const savedSale = await sale.save();

    res.status(201).json({
      message: 'Sale created successfully',
      saleId: savedSale._id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to create sale', error: error.message });
  }
};

// Update sale
export const updateSale = async (req, res) => {
  try {
    const {
      productId,
      customerId,
      userId,
      quantity,
      totalAmount,
      paymentMethod,
    } = req.body;

    // Validation
    if (
      quantity !== undefined &&
      (typeof quantity !== 'number' || quantity <= 0)
    ) {
      return res
        .status(400)
        .json({ message: 'Quantity must be a positive number' });
    }

    if (
      totalAmount !== undefined &&
      (typeof totalAmount !== 'number' || totalAmount <= 0)
    ) {
      return res
        .status(400)
        .json({ message: 'Total amount must be a positive number' });
    }

    const updateData = {};
    if (productId) updateData.productId = productId;
    if (customerId) updateData.customerId = customerId;
    if (userId) updateData.userId = userId;
    if (quantity) updateData.quantity = quantity;
    if (totalAmount) updateData.totalAmount = totalAmount;
    if (paymentMethod) updateData.paymentMethod = paymentMethod;

    const sale = await Sale.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    res.status(200).json({ message: 'Sale updated successfully' });
  } catch (error) {
    if (error.message === 'Invalid sale ID' || error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid sale ID format' });
    }
    res
      .status(500)
      .json({ message: 'Failed to update sale', error: error.message });
  }
};

export const getSalesByUserId = async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({ error: 'Invalid user ID format.' });
  }
  try {
    // const sales = await findSalesByUserId(userId);
    // if (!sales || sales.length === 0) {
    //   return res.status(404).send({ error: 'No sales found for this user.' });
    // }
    return res
      .status(200)
      .json({ sales: `sales for user with id ${userId} placeholder` });
  } catch (error) {
    console.log(`Error fetching sales for user with ID ${userId}:`, error);
    return res
      .status(500)
      .send({ error: 'An error occurred while fetching the sales.' });
  }
};

export const getSalesByCustomerId = async (req, res) => {
  const { customerId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(customerId)) {
    return res.status(400).send({ error: 'Invalid customer ID format.' });
  }
  try {
    // const sales = await findSalesByCustomerId(customerId);
    // if (!sales || sales.length === 0) {
    //   return res.status(404).send({ error: 'No sales found for this customer.' });
    // }
    return res
      .status(200)
      .json({ sales: `sales for customer with id ${customerId} placeholder` });
  } catch (error) {
    console.log(
      `Error fetching sales for customer with ID ${customerId}:`,
      error,
    );
    return res
      .status(500)
      .send({ error: 'An error occurred while fetching the sales.' });
  }
};

// Delete sale
export const deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id);

    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    res.status(200).json({ message: 'Sale deleted successfully' });
  } catch (error) {
    if (error.message === 'Invalid sale ID' || error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid sale ID format' });
    }
    res
      .status(500)
      .json({ message: 'Failed to delete sale', error: error.message });
  }
};
