import { body } from 'express-validator';

export const validateSale = [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('customerId').notEmpty().withMessage('Customer ID is required'),
  body('userId').notEmpty().withMessage('User ID is required'),
  body('priceAtSale')
    .isFloat({ gt: 0 })
    .withMessage('Price at sale must be greater than 0'),
  body('quantity')
    .isInt({ gt: 0 })
    .withMessage('Quantity must be greater than 0'),
  body('totalAmount')
    .isFloat({ gt: 0 })
    .withMessage('Total amount must be greater than 0'),
  body('cashierName')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .default('unknown')
    .withMessage('Cashier name cannot be empty if provided'),
  body('paymentMethod').notEmpty().withMessage('Payment method is required'),
];

export const validateSaleUpdate = [
  body('productId').optional().notEmpty().withMessage('Product ID is required'),
  body('customerId')
    .optional()
    .notEmpty()
    .withMessage('Customer ID is required'),
  body('userId').optional().notEmpty().withMessage('User ID is required'),
  body('priceAtSale')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('Price at sale must be greater than 0'),
  body('quantity')
    .optional()
    .isInt({ gt: 0 })
    .withMessage('Quantity must be greater than 0'),
  body('totalAmount')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('Total amount must be greater than 0'),
  body('cashierName')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .default('unknown')
    .withMessage('Cashier name cannot be empty if provided'),
  body('paymentMethod')
    .optional()
    .notEmpty()
    .withMessage('Payment method is required'),
];
