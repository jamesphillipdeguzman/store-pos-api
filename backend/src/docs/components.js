export const components = {
  schemas: {
    Product: {
      type: 'object',
      required: ['name', 'sku', 'stock', 'category', 'supplier', 'createdAt'],
      properties: {
        name: { type: 'string' },
        sku: { type: 'string' },
        stock: { type: 'number' },
        description: { type: 'string' },
        price: { type: 'number', minimum: 0 },
        category: { type: 'string' },
        supplier: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
      },
    },
    Sale: {
      type: 'object',
      required: [
        'productId',
        'customerId',
        'userId',
        'priceAtSale',
        'quantity',
        'totalAmount',
        'saleDate',
        'paymentMethod',
      ],
      properties: {
        productId: {
          type: 'string',
          description: 'MongoDB ObjectId reference to the Product',
        },
        customerId: {
          type: 'string',
          description: 'MongoDB ObjectId reference to the Customer',
        },
        userId: {
          type: 'string',
          description: 'MongoDB ObjectId reference to the User',
        },
        priceAtSale: {
          type: 'number',
          minimum: 0,
        },
        quantity: {
          type: 'number',
          minimum: 0,
        },
        totalAmount: {
          type: 'number',
          minimum: 0,
        },
        saleDate: {
          type: 'string',
          format: 'date-time',
          description: 'Date and time of the sale',
        },
        paymentMethod: {
          type: 'string',
          enum: ['cash', 'credit', 'debit', 'paypal', 'gcash'],
          description: 'Method of payment',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
        },
      },
    },
    User: {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        name: { 
          type: 'string',
          description: 'Full name of the user'
        },
        email: { 
          type: 'string',
          format: 'email',
          description: 'Email address of the user'
        },
        password: { 
          type: 'string',
          description: 'User password (hashed in storage)'
        },
        role: { 
          type: 'string',
          enum: ['admin', 'user'],
          description: 'User role for access control'
        },
        createdAt: { 
          type: 'string',
          format: 'date-time'
        },
        updatedAt: { 
          type: 'string',
          format: 'date-time'
        }
      },
    },
    Customer: {
      type: 'object',
      required: ['name', 'email', 'phone'],
      properties: {
        name: { 
          type: 'string',
          description: 'Full name of the customer'
        },
        email: { 
          type: 'string',
          format: 'email',
          description: 'Email address of the customer'
        },
        phone: { 
          type: 'string',
          description: 'Phone number of the customer'
        },
        address: { 
          type: 'string',
          description: 'Physical address of the customer'
        },
        createdAt: { 
          type: 'string',
          format: 'date-time'
        },
        updatedAt: { 
          type: 'string',
          format: 'date-time'
        }
      },
    },
    // Otros esquemas pueden ser añadidos por otros miembros del equipo
  },
  responses: {
    NotFound: {
      description: 'The specified resource was not found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Resource not found',
              },
            },
          },
        },
      },
    },
    BadRequest: {
      description: 'Bad request',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Invalid input data',
              },
              error: {
                type: 'string',
                example: 'Validation error details',
              },
            },
          },
        },
      },
    },
    ServerError: {
      description: 'Server error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Internal server error',
              },
              error: {
                type: 'string',
                example: 'Error details',
              },
            },
          },
        },
      },
    },
  },
  // securitySchemes: {
  //   bearerAuth: {
  //     type: 'http',
  //     scheme: 'bearer',
  //     bearerFormat: 'JWT',
  //   },
  // },
};
