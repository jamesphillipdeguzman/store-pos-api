export const components = {
  schemas: {
    Sale: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          description: 'Auto-generated sale ID',
        },
        productId: {
          type: 'string',
          description: 'ID of the product',
        },
        customerId: {
          type: 'string',
          description: 'ID of the customer',
        },
        userId: {
          type: 'string',
          description: 'ID of the user (cashier)',
        },
        priceAtSale: {
          type: 'number',
          description: 'Price of the product at the time of sale',
        },
        quantity: {
          type: 'number',
          description: 'Quantity of products sold',
        },
        totalAmount: {
          type: 'number',
          description: 'Total amount of the sale',
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
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
};