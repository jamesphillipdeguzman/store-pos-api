import { body } from 'express-validator';

export const validateUserSignup = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('role')
    .optional()
    .isIn(['admin', 'cashier'])
    .withMessage('Role must be admin or cashier'),
];

export const validateUserLogin = [
  body('email').isEmail().withMessage('Email is invalid'),
];
