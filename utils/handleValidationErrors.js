import expressValidator from 'express-validator';

const { validationResult } = expressValidator;

export default (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  next();
};
