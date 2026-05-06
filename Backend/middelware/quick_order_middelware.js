import { body, validationResult } from 'express-validator'

export const Quickvalidation = [
    body('pan_num').exists().withMessage("PAN number is required")
        .isLength({ min: 10, max: 10 }).withMessage("PAN must be 10 characters")
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/).withMessage("Invalid PAN format"),

    body('order_amount').exists().withMessage('Amount is required')
        .isNumeric().withMessage("Use numbers only in Amount"),

    body('account_no').exists().withMessage("Account number is required")
        .isLength({ min: 5, max: 25 }).withMessage("Must befrom 5 to 25 digits")
        .isNumeric().withMessage("Must constain only Numbers"),
    body('email').exists().withMessage("Email is required")
        .notEmpty().withMessage("Email cannot be empty")
        .isEmail().withMessage("Invalid Email format")
        .normalizeEmail(),

    body('mobile_no').exists().withMessage("Mobile number is required")
        .isLength({ min: 10, max: 10 }).withMessage("Must be 10 chracters Mobile number")
        .isNumeric().withMessage("Invalid mobile number format")



]

export const QuickMiddelware = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}