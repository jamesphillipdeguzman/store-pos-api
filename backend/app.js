import dotenv from 'dotenv';
// Load environment variables first
dotenv.config();
import express from 'express';
import cors from 'cors';
import productRoutes from './src/routes/product.route.js';
import saleRoutes from './src/routes/sale.route.js';
import userRoutes from './src/routes/user.route.js';
import customerRoutes from './src/routes/customer.route.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/docs/swagger.js';
import session from 'express-session';
// import passport from './src/config/passport.config.js';
// import authRoutes from './src/routes/auth.route.js';

console.log('ENV:', {
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  SESSION_SECRET: !!process.env.SESSION_SECRET,
  NODE_ENV: process.env.NODE_ENV,
});
console.log('Secure cookie:', process.env.NODE_ENV === 'production');

// Initialize an express app
const app = express();

// CORS middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://127.0.0.1:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Parse JSON payloads
app.use(express.json());

// Parse form payloads
app.use(express.urlencoded({ extended: true }));

// Create Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Required for HTTPS. Evaluates to true for production
      sameSite: 'none', // Required for cross-origin
      maxAge: 1000 * 60 * 60, // 1 hour
    },
    proxy: true, // Required for secure cookies behind a proxy
  }),
);

// Add debug logging
app.use((req, res, next) => {
  console.log('Request Origin:', req.headers.origin);
  console.log('Session:', req.session);
  console.log('Session ID:', req.sessionID);
  console.log('Cookies:', req.cookies);
  next();
});

// Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());

// Server Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Greet the user
app.get('/', (req, res) => {
  res.send('Welcome to Store-POS-API by Team 01!');
});

// Mount routes at /auth, /api/products, and /api/sales
// app.use('/', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/customers', customerRoutes);

export { app };
