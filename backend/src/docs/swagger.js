<<<<<<< HEAD
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { components } from './components.js';
=======
import swaggerJSDoc from 'swagger-jsdoc';
import components from './components.js';
>>>>>>> main

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
<<<<<<< HEAD
      title: 'Store POS API',
      version: '1.0.0',
      description: 'API documentation for Store POS system',
      contact: {
        name: 'Development Team',
        email: 'dev@storepos.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
    components,
  },
  // Paths to files containing OpenAPI definitions
  apis: [
    './src/routes/*.js',
    './src/models/*.js',
  ],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
=======
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

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
>>>>>>> main
