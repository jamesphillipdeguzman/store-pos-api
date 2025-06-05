const { body } = require('express-validator');

exports.validateSale = [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('customerId').notEmpty().withMessage('Customer ID is required'),
  body('userId').notEmpty().withMessage('User ID is required'),
  body('priceAtSale').isFloat({ gt: 0 }).withMessage('Price at sale must be greater than 0'),
  body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be greater than 0'),
  body('totalAmount').isFloat({ gt: 0 }).withMessage('Total amount must be greater than 0'),
  body('paymentMethod').notEmpty().withMessage('Payment method is required'),
];
