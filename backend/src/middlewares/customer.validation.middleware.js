import { body, validationResult, param } from 'express-validator';

const runChecks = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateCustomer = [
  body('firstName').notEmpty().withMessage('First name is required').trim(),
  body('lastName').notEmpty().withMessage('Last name is required').trim(),
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .trim()
    .normalizeEmail(),
  body('phone').optional().isString().trim(),
  body('address').optional().isString().trim(),
  runChecks,
];

export const validateCustomerUpdate = [
  param('id').isMongoId().withMessage('Invalid customer id'),
  body('firstName')
    .optional()
    .notEmpty()
    .withMessage('First name is required')
    .trim(),
  body('lastName')
    .optional()
    .notEmpty()
    .withMessage('Last name is required')
    .trim(),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Valid email is required')
    .trim()
    .normalizeEmail(),
  body('phone').optional().isString().trim(),
  body('address').optional().isString().trim(),
  runChecks,
];
