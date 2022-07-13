import expressValidator from 'express-validator';

const { body } = expressValidator;

export const registrationValidator = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({
    min: 5,
  }),
  body('fullName', 'Invalid full name length').isLength({ min: 1 }),
  body('avatarUrl', 'Invalid avatar').optional().isString(),
];

export const loginValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({
    min: 5,
  }),
];

export const postCreateValidation = [
  body('title', 'Title is required').isLength({ min: 3 }).isString(),
  body('text', 'Post text is required')
    .isLength({
      min: 5,
    })
    .isString(),
  body('tags', 'Invalid tags').optional().isArray(),
  body('imageUrl', 'Invalid image url').optional().isString(),
];

export const commentValidation = [
  body('text', 'Post text is required')
    .isLength({
      min: 5,
    })
    .isString(),
];
