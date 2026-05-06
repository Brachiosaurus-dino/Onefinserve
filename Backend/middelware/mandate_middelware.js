
import { body } from "express-validator";
import { validationResult } from 'express-validator'

export const MandateValidation = [
    body('client_name').exists().withMessage('Name is required'),

    body('client_code').exists().withMessage("PAN number is required")
        .isLength({ min: 10, max: 10 }).withMessage("PAN number must be 10 characters")
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/).withMessage("Invalid PAN format"),

    body('amount').exists().withMessage("Amount is required")
        .isNumeric().withMessage("Must be in numbers"),

    body('account_no').exists().withMessage("Account number is required")
        .isLength({ min: 5, max: 25 }).exists("Must be between 5 to 25 digits")
        .isNumeric().withMessage("Must constain only Numbers"),

    body('ifsc_code').exists().withMessage("IFSC code is required")
        .isLength({ min: 11, max: 11 }).withMessage("IFSC code must be 11 chracters")
        .matches(/^[A-Z]{4}0[0-9A-Z]{6}$/).withMessage("Invalid IFSC code"),

    body('micr_code').exists().withMessage("MICR number is required")
        .isLength({ min: 9, max: 9 }).withMessage("MICR number must be 9 characters")
        .matches(/^[0-9]{9}$/).withMessage("Invalid MICR format"),

    body('start_date').exists().withMessage("Start date is required"),

    body('end_date').exists().withMessage("End date is required")

]

export const MandateMiddelware = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next()
} 