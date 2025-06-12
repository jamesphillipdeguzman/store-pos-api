import request from 'supertest';
import express from 'express';
import userRoutes from '../src/routes/user.route.js';

// This would bypass middleware so they don’t block the test
// This focuses the test only on routing and controller logic
jest.mock('../src/middlewares/auth.middleware.js', () => ({
  hybridAuth: (req, res, next) => next(),
}));

// jest.mock('../src/middlewares/validate.middleware.js', () => ({
//   validate: (req, res, next) => next(),
// }));

jest.mock('../src/middlewares/common.middleware.js', () => ({
  validateMongoIdParam: (req, res, next) => next(),
}));

// Mock controller methods
jest.mock('../src/controllers/user.controller.js', () => ({
  getUsers: (req, res) =>
    res.status(200).json([{ _id: 'user123', name: 'Mawuli' }]),
  getUserById: (req, res) =>
    res.status(200).json({ _id: req.params.id, name: 'Mawuli' }),
  getUserProfile: (req, res) =>
    res.status(200).json({ _id: 'profile123', name: 'My Profile' }),
  userSignup: (req, res) => res.status(201).json({ created: true }),
  userLogin: (req, res) => res.status(200).json({ token: 'abc123' }),
  userLogout: (req, res) => res.status(200).json({ logout: true }),
  getUserByEmail: (req, res) =>
    res.status(200).json({ email: req.query.email, name: 'Found user' }),
}));

//  Creating the Test App
// To Create an isolated instance of the Express app.
const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

describe('User routes', () => {
  test('GET /api/users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/users/:id', async () => {
    const res = await request(app).get('/api/users/user123');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', 'user123');
  });

  // Added GET api users profile
  // This  would return the current user's profile (mocked).
  test('GET /api/users/profile', async () => {
    const res = await request(app).get('/api/users/profile');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id');
  });

  // POST api users signup
  test('POST /api/users/signup', async () => {
    const res = await request(app)
      .post('/api/users/signup')
      .send({ name: 'John', email: 'john@email.com', role: 'admin' }); //dummy data to Verify that the route works
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('created', true);
  });

  //POST /api/users/login
  // Simulates login. Expects a token in response.
  test('POST /api/users/login', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'john@email.com' }); // dummy data

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  // POST api users logout
  // This simulates logging out and expects a logout: true response.
  test('POST /api/users/logout', async () => {
    const res = await request(app).post('/api/users/logout');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('logout', true);
  });

  // Simulates email checks
  test('GET /api/users/email', async () => {
    const res = await request(app).get(
      '/api/users/email?email=test@example.com',
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('email', 'test@example.com');
  });
});
