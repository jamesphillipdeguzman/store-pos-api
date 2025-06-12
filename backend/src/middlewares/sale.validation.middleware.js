import { body } from 'express-validator';

export const validateSale = [
  body('productId')
    .notEmpty()
    .withMessage('Product ID is required')
    .bail()
    .isMongoId()
    .withMessage('Invalid product ID'),
  body('customerId')
    .notEmpty()
    .withMessage('Customer ID is required')
    .bail()
    .isMongoId()
    .withMessage('Invalid customer ID'),
  body('userId')
    .notEmpty()
    .withMessage('User ID is required')
    .bail()
    .isMongoId()
    .withMessage('Invalid user ID'),
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
    .withMessage('Cashier name cannot be empty if provided'),
  body('paymentMethod')
    .notEmpty()
    .withMessage('Payment method is required')
    .isIn(['cash', 'credit', 'paypal', 'gcash'])
    .withMessage('Invalid payment method'),
];

export const validateSaleUpdate = [
  body('productId')
    .optional()
    .notEmpty()
    .withMessage('Product ID is required')
    .bail()
    .isMongoId()
    .withMessage('Invalid product ID'),
  body('customerId')
    .optional()
    .notEmpty()
    .withMessage('Customer ID is required')
    .bail()
    .isMongoId()
    .withMessage('Invalid customer ID'),
  body('userId')
    .optional()
    .notEmpty()
    .withMessage('User ID is required')
    .bail()
    .isMongoId()
    .withMessage('Invalid user ID'),
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
    .withMessage('Cashier name cannot be empty if provided'),
  body('paymentMethod')
    .optional()
    .notEmpty()
    .withMessage('Payment method is required')
    .isIn(['cash', 'credit', 'paypal', 'gcash'])
    .withMessage('Invalid payment method'),
];
