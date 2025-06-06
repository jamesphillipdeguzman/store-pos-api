import { body } from 'express-validator';

export const validateCustomer = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').optional().isString(),
  body('address').optional().isString(),
];

export const validateCustomerUpdate = [
  body('firstName').optional().notEmpty().withMessage('First name is required'),
  body('lastName').optional().notEmpty().withMessage('Last name is required'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('phone').optional().isString(),
  body('address').optional().isString(),
];
