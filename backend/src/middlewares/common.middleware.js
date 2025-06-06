import { param } from 'express-validator';

export const validateMongoIdParam = [
  param('id').isMongoId().withMessage('Invalid ID format'),
];
