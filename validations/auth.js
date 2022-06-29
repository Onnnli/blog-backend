import expressValidator from "express-validator";

const {body} = expressValidator;

export const registrationValidator = [
    body('email').isEmail(),
    body('password').isLength({min: 5}),
    body('fullName').isLength({min:1}),
    body('avatarUrl').optional().isURL(),
]