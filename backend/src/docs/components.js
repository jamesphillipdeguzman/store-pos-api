export default {
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
          default: 'cash',
        },
      },
    },
  },
};
