const { body } = require('express-validator');

exports.validateUserSignup = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('role').optional().isIn(['admin', 'cashier']).withMessage('Role must be admin or cashier'),
];

exports.validateUserLogin = [
  body('email').isEmail().withMessage('Email is invalid'),
];
