import expressValidator from 'express-validator';

const { body } = expressValidator;

export const registrationValidator = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({
    min: 5,
  }),
  body('fullName', 'Invalid full name length').isLength({ min: 1 }),
  body('avatarUrl', 'Invalid avatar').optional().isURL(),
];

export const a = 2;
