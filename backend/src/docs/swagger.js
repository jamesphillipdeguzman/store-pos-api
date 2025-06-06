import swaggerJsdoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
import { components } from './components.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'store-pos-api',
      version: '1.0.0',
      description:
        'A simple Point-of-Sale (POS) system for small stores, ready for frontend consumption',
    },
    servers: [
      {
        url: 'https://store-pos-api.onrender.com/',
      },
      {
        url: 'http:127.0.0.1/3001',
      },
    ],
    tags: [
      {
        name: 'Authentication',
        description:
          'Google OAuth login/logout routes are not for testing, but for documentation only',
      },
      {
        name: 'Products',
        description: 'Product management routes for testing',
      },
      {
        name: 'Sales',
        description: 'Sale management routes for testing',
      },
    ],
    components: components,
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
