import mongoose from 'mongoose';

import {
  findAllCustomers,
  findCustomerById,
  createCustomer as createCustomerService,
  updateCustomerById as updateCustomerByIdService,
  deleteCustomerById as deleteCustomerByIdService,
} from '../services/customer.service.js';
/**
 * @route GET /api/customers
 * @desc Fetch all customers
 */
export const getCustomers = async (req, res) => {
  try {
    const customers = await findAllCustomers();
    if (!customers || customers.length === 0) {
      return res.status(404).json({ error: 'No customers found.' });
    }
    console.log('[CUSTOMER] GET /api/customers was called.');
    return res.status(200).json(customers);
  } catch (error) {
    console.log('Error fetching customers:', error);
    return res
      .status(500)
      .json({ error: 'An error occurred while fetching customers.' });
  }
};

/**
 * @route GET /api/customers/:id
 * @desc Fetch a customer by ID
 */

export const getCustomerById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid customer ID format.' });
  }
  try {
    const customer = await findCustomerById(id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found.' });
    }
    console.log(`[CUSTOMER] GET /api/customers/${id} was called`);
    return res.status(200).json(customer);
  } catch (error) {
    console.log(`Error fetching customer with ID ${id}:`, error);
    return res
      .status(500)
      .json({ error: 'An error occurred while fetching the customer.' });
  }
};

/**
 * @route POST /api/customers
 * @desc Create a new customer
 */

export const postCustomer = async (req, res) => {
  const customerData = req.body;
  try {
    const newCustomer = await createCustomerService(customerData);
    if (!newCustomer) {
      return res.status(400).json({ error: 'Failed to create customer.' });
    }
    console.log(`[CUSTOMER] POST /api/customers was called`);
    return res.status(201).json(newCustomer);
  } catch (error) {
    console.log('Error creating customer:', error);
    return res
      .status(500)
      .json({ error: 'An error occurred while creating the customer.' });
  }
};

/**
 * @route PUT /api/customers/:id
 * @desc Update a customer by ID
 */

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid customer ID format.' });
  }
  try {
    const updatedCustomer = await updateCustomerByIdService(id, updates);
    if (!updatedCustomer) {
      return res.status(404).json({ error: 'Customer not found.' });
    }
    console.log(`[CUSTOMER] PUT /api/customers/${id} was called`);
    return res.status(200).json(updatedCustomer);
  } catch (error) {
    console.log(`Error updating customer with ID ${id}:`, error);
    return res
      .status(500)
      .json({ error: 'An error occurred while updating the customer.' });
  }
};

/**
 * @route DELETE /api/customers/:id
 * @desc Delete a customer by ID
 */

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid customer ID format.' });
  }
  try {
    const deletedUser = await deleteCustomerByIdService(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'Customer not found.' });
    }
    console.log(`[CUSTOMER] DELETE /api/customers/${id} was called`);
    return res.status(200).json({ message: `Customer ${id} deleted` });
  } catch (error) {
    console.log(`Error deleting customer with ID ${id}:`, error);
    return res
      .status(500)
      .json({ error: 'An error occurred while deleting the customer.' });
  }
};
