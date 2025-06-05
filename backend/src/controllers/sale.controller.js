import mongoose from 'mongoose';

// Services (sale.service.js)
// findAllSales() — Get all sales

// findSaleById(id) — Get sale by ID

// findSalesByUserId(userId) — Get all sales by a user (cashier/admin)

// findSalesByCustomerId(customerId) — Get all sales by a customer

// createSale(data) — Create a new sale record

// updateSaleById(id, updates) — Update sale by ID

// deleteSaleById(id) — Delete sale by ID

export const getSales = async (req, res) => {
  try {
    // const sales = await findAllSales();
    // if (!sales || sales.length === 0) {
    //   return res.status(404).send({ error: 'No sales found.' });
    // }
    return res.status(200).json({ sales: 'sales placeholder' });
  } catch (error) {
    console.log('Error fetching sales:', error);
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
    // const sale = await findSaleById(id);
    // if (!sale) {
    //   return res.status(404).send({ error: 'Sale not found.' });
    // }
    return res.status(200).json({ sale: `sale with id ${id} placeholder` });
  } catch (error) {
    console.log(`Error fetching sale with ID ${id}:`, error);
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

export const createSale = async (req, res) => {
  const saleData = req.body;
  try {
    // const newSale = await createSale(saleData);
    // if (!newSale) {
    //   return res.status(400).send({ error: 'Failed to create sale.' });
    // }
    return res.status(201).json({ sale: 'new sale placeholder' });
  } catch (error) {
    console.log('Error creating sale:', error);
    return res
      .status(500)
      .send({ error: 'An error occurred while creating the sale.' });
  }
};

export const updateSaleById = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid sale ID format.' });
  }
  try {
    // const updatedSale = await updateSaleById(id, updates);
    // if (!updatedSale) {
    //   return res.status(404).send({ error: 'Sale not found.' });
    // }
    return res
      .status(200)
      .json({ sale: `updated sale with id ${id} placeholder` });
  } catch (error) {
    console.log(`Error updating sale with ID ${id}:`, error);
    return res
      .status(500)
      .send({ error: 'An error occurred while updating the sale.' });
  }
};

export const deleteSaleById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid sale ID format.' });
  }
  try {
    // const deletedSale = await deleteSaleById(id);
    // if (!deletedSale) {
    //   return res.status(404).send({ error: 'Sale not found.' });
    // }
    return res
      .status(200)
      .json({ message: `sale with id ${id} deleted successfully` });
  } catch (error) {
    console.log(`Error deleting sale with ID ${id}:`, error);
    return res
      .status(500)
      .send({ error: 'An error occurred while deleting the sale.' });
  }
};
