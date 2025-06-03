import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { components } from './components.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
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