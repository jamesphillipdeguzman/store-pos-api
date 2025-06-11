import { param, query } from 'express-validator';

export const validateMongoIdParam = [
  param('id').isMongoId().withMessage('Invalid ID format'),
];

export const validateEmailQuery = [
  query('email').isEmail().withMessage('Invalid email'),
];
