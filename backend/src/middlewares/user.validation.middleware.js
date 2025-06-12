import { body, validationResult, param } from 'express-validator';

const runChecks = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateUserSignup = [
  body('name').notEmpty().withMessage('Name is required').trim(),
  body('email').isEmail().withMessage('Email is invalid').normalizeEmail(),
  body('role')
    .optional()
    .isIn(['admin', 'cashier'])
    .withMessage('Role must be admin or cashier'),
  runChecks,
];

export const validateUserUpdate = [
  param('id').isMongoId().withMessage('Invalid user ID'),
  body('name').optional().notEmpty().withMessage('Name is required').trim(),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email is invalid')
    .normalizeEmail(),
  body('role')
    .optional()
    .isIn(['admin', 'cashier'])
    .withMessage('Role must be admin or cashier'),
  runChecks,
];
