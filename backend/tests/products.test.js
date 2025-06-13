import request from 'supertest';
import express from 'express';
import productRoutes from '../src/routes/product.route.js';

// Bypass middleware for testing purposes
jest.mock('../src/middlewares/auth.middleware.js', () => ({
  hybridAuth: (req, res, next) => next(),
}));

jest.mock('../src/middlewares/validate.middleware.js', () => ({
  validate: (req, res, next) => next(),
}));

jest.mock('../src/middlewares/product.validation.middleware.js', () => ({
  validateProduct: (req, res, next) => next(),
  validateProductUpdate: (req, res, next) => next(),
}));

jest.mock('../src/middlewares/common.middleware.js', () => ({
  validateMongoIdParam: (req, res, next) => next(),
}));

// Mock controller methods
jest.mock('../src/controllers/product.controller.js', () => ({
  getProducts: (req, res) =>
    res.status(200).json([{ _id: 'product123', name: 'Laptop' }]),
  getProduct: (req, res) =>
    res.status(200).json({ _id: req.params.id, name: 'Laptop' }),
  postProduct: (req, res) =>
    res.status(201).json({ created: true }),
  updateProduct: (req, res) =>
    res.status(200).json({ updated: true }),
  deleteProduct: (req, res) =>
    res.status(200).json({ deleted: true }),
}));


// Create test app instance
const app = express();
app.use(express.json());
app.use('/api/products', productRoutes);

test('GET /api/products', async () => {
  const res = await request(app).get('/api/products');
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

test('GET /api/products/:id', async () => {
  const res = await request(app).get('/api/products/product123');
  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty('_id', 'product123');
});