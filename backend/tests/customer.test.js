import request from 'supertest';
import express from 'express';
import customerRoutes from '../src/routes/customer.route.js';

// Bypass middleware for testing
jest.mock('../src/middlewares/auth.middleware.js', () => ({
  hybridAuth: (req, res, next) => next(),
}));

jest.mock('../src/middlewares/validate.middleware.js', () => ({
  validate: (req, res, next) => next(),
}));

jest.mock('../src/middlewares/customer.validation.middleware.js', () => ({
  validateCustomer: (req, res, next) => next(),
  validateCustomerUpdate: (req, res, next) => next(),
}));

jest.mock('../src/middlewares/common.middleware.js', () => ({
  validateMongoIdParam: (req, res, next) => next(),
}));

// Ensure function names match your actual route file
jest.mock('../src/controllers/customer.controller.js', () => ({
  getCustomers: (req, res) =>
    res.status(200).json([{ _id: 'cust123', fullName: 'John Doe' }]),
  getCustomerById: (req, res) =>
    res.status(200).json({ _id: req.params.id, fullName: 'John Doe' }),
  postCustomer: (req, res) => res.status(201).json({ created: true }),
  updateCustomer: (req, res) => res.status(200).json({ updated: true }),
  deleteCustomer: (req, res) => res.status(200).json({ deleted: true }),
}));

// Create test app instance
const app = express();
app.use(express.json());
app.use('/api/customers', customerRoutes);

describe('Customer Routes', () => {
  test('GET /api/customers', async () => {
    const res = await request(app).get('/api/customers');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/customers/:id', async () => {
    const res = await request(app).get('/api/customers/cust123');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', 'cust123');
  });
});
