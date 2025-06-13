import request from 'supertest';
import { app } from '../app.js';
import * as productService from '../src/services/product.service.js';
jest.mock('../src/services/product.service.js');
jest.mock('../src/middlewares/auth.middleware.js');

describe('GET /api/products', () => {
  it('should return all products', async () => {
    const mockProducts = [{ _id: '123', name: 'Shampoo' }];
    productService.findAllProducts.mockResolvedValue(mockProducts);

    const res = await request(app).get('/api/products');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockProducts);
  });
});

describe('GET /api/products/:id', () => {
  it('should return a product by ID', async () => {
    const mockProduct = { _id: '60c72b2f9b1e8c1f8c8f9e1a', name: 'Shampoo' };
    productService.findProductById.mockResolvedValue(mockProduct);

    const res = await request(app).get(`/api/products/${mockProduct._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Shampoo');
  });

  it('should return 404 if product not found', async () => {
    const fakeId = '60c72b2f9b1e8c1f8c8f9e1b'; // valid ObjectId but non-existent
    productService.findProductById.mockResolvedValue(null);

    const res = await request(app).get(`/api/products/${fakeId}`);

    expect(res.statusCode).toBe(404);
  });

  it('should return 400 if product ID is invalid', async () => {
    const res = await request(app).get('/api/products/invalid-id');

    expect(res.statusCode).toBe(400);
  });
});
