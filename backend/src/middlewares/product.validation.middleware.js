const { body } = require('express-validator');

exports.validateProduct = [
  body('name').notEmpty().withMessage('Name is required'),
  body('sku').notEmpty().withMessage('SKU is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('category').optional().isString(),
  body('description').optional().isString(),
  body('supplier').optional().isString(),
];