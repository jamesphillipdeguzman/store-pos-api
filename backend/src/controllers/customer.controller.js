import mongoose from 'mongoose';

// Services (customer.service.js)
// findAllCustomers() — Get all customers DONE

// findCustomerById(id) — Get customer by ID

// createCustomer(data) — Create a new customer

// updateCustomerById(id, updates) — Update customer by ID

// deleteCustomerById(id) — Delete customer by ID

export const getCustomers = async (req, res) => {
  try {
    // const customers = await findAllCustomers();
    return res.status(200).json({ customers: 'customers placeholder' });
  } catch (error) {
    console.log('Error fetching customers:', error);
    return res
      .status(500)
      .send({ error: 'An error occurred while fetching customers.' });
  }
};

export const getCustomerById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid customer ID format.' });
  }
  try {
    // const customer = await findCustomerById(id);
    // if (!customer) {
    //   return res.status(404).send({ error: 'Customer not found.' });
    // }
    return res
      .status(200)
      .json({ customer: `customer with id ${id} placeholder` });
  } catch (error) {
    console.log(`Error fetching customer with ID ${id}:`, error);
    return res
      .status(500)
      .send({ error: 'An error occurred while fetching the customer.' });
  }
};

export const createCustomer = async (req, res) => {
  const customerData = req.body;
  try {
    // const newCustomer = await createCustomer(customerData);
    // if (!newCustomer) {
    //   return res.status(400).send({ error: 'Failed to create customer.' });
    // }
    return res.status(201).json({ customer: 'new customer placeholder' });
  } catch (error) {
    console.log('Error creating customer:', error);
    return res
      .status(500)
      .send({ error: 'An error occurred while creating the customer.' });
  }
};

export const updateCustomerById = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid customer ID format.' });
  }
  try {
    // const updatedCustomer = await updateCustomerById(id, updates);
    // if (!updatedCustomer) {
    //   return res.status(404).send({ error: 'Customer not found.' });
    // }
    return res
      .status(200)
      .json({ customer: `updated customer with id ${id} placeholder` });
  } catch (error) {
    console.log(`Error updating customer with ID ${id}:`, error);
    return res
      .status(500)
      .send({ error: 'An error occurred while updating the customer.' });
  }
};

export const deleteCustomerById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid customer ID format.' });
  }
  try {
    // const deletedUser = await deleteCustomerById(id);
    // if (!deletedUser) {
    //   return res.status(404).send({ error: 'Customer not found.' });
    // }
    return res.status(204).send();
  } catch (error) {
    console.log(`Error deleting customer with ID ${id}:`, error);
    return res
      .status(500)
      .send({ error: 'An error occurred while deleting the customer.' });
  }
};
