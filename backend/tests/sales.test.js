import request from 'supertest';
import express from 'express';
import saleRoutes from '../src/routes/sale.route.js';

jest.mock('../src/middlewares/auth.middleware.js', () => ({
  hybridAuth: (req, res, next) => next(),
}));
jest.mock('../src/middlewares/common.middleware.js', () => ({
  validateMongoIdParam: (req, res, next) => next(),
}));
jest.mock('../src/middlewares/validate.middleware.js', () => ({
  validate: (req, res, next) => next(),
}));

jest.mock('../src/controllers/sale.controller.js', () => ({
  getSales: (req, res) => res.status(200).json({ sales: [{ id: 'test-id' }] }),
  getSaleById: (req, res) => res.status(200).json({ id: req.params.id, total: 100 }),
  getSalesByUserId: (req, res) => res.status(200).json({ userId: req.params.userId }),
  getSalesByCustomerId: (req, res) => res.status(200).json({ customerId: req.params.customerId }),
  postSale: (req, res) => res.status(201).json({ success: true }),
  updateSale: (req, res) => res.status(200).json({ updated: true }),
  deleteSale: (req, res) => res.status(200).json({ deleted: true }),
}));

const app = express();
app.use('/api/sales', saleRoutes);

describe('Sales routes', () => {

  test('GET /api/sales/', async () => {
    const res = await request(app).get('/api/sales/');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
  
  test('responds to /api/sales/:id', async () => {
    const res = await request(app).get('/api/sales/6842d1a5392a386a00050b5b'); 
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /api/sales/user/:userId', async () => {
    const res = await request(app).get('/api/sales/user/6842d1a5392a386a00050b5b');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /api/sales/customer/:customerId', async () => {
    const res = await request(app).get('/api/sales/customer/6842d1a5392a386a00050b5b');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

});