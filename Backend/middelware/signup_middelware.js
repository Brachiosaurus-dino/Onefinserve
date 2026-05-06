import { body, validationResult } from 'express-validator'

export const SignUpValidation = [
    body('panNumber').exists().withMessage("PAN number is required")
        .isLength({ min: 10, max: 10 }).withMessage("Must be 10 characters here")
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).withMessage("Invalid PAN format"),
        
    body('fullName')
        .notEmpty()
        .withMessage("Full name is required")
        .matches(/^[A-Za-z\s]+$/)
        .withMessage("Full name must contain only letters and spaces"),

    body('email').exists().withMessage("Email is required")
        .notEmpty().withMessage("Email cannot be empty")
        .normalizeEmail(),

    body('mobile_num').exists().withMessage("Phone number is required")
        .isLength({ min: 10, max: 10 }).withMessage('Must be 10 digits')
        .matches(/^[0-9]{10}$/).withMessage('Use only numbers'),

    body('setPasswordss')
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8, max: 128 })
        .withMessage("Password must be between 8 and 128 characters")
        .matches(/[A-Z]/)
        .withMessage("Must contain at least one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Must contain at least one lowercase letter")
        .matches(/\d/)
        .withMessage("Must contain at least one number")
        .matches(/[^A-Za-z0-9]/)
        .withMessage("Must contain at least one special character")
        .trim()

]

export const SignUpMiddelware = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}