import { body } from 'express-validator';

export const validateProduct = [
  body('name').notEmpty().withMessage('Name is required').trim(),
  body('sku').notEmpty().withMessage('SKU is required').trim(),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be a number greater than 0'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  body('category').optional().isString().trim(),
  body('description').optional().isString().trim(),
  body('supplier').optional().isString().trim(),
];

export const validateProductUpdate = [
  body('name').optional().notEmpty().withMessage('Name is required').trim(),
  body('sku').optional().notEmpty().withMessage('SKU is required').trim(),
  body('price')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('Price must be a number greater than 0'),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  body('category').optional().isString().trim(),
  body('description').optional().isString().trim(),
  body('supplier').optional().isString().trim(),
];
