import { body, validationResult } from 'express-validator'

export const KycValidation = [
    body('pan_no').exists().withMessage("PAN number is required")
        .isLength({ min: 10, max: 10 }).withMessage("PAN number must be 10 characters")
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/).withMessage("Invalid PAN format"),

    body('full_name').exists().withMessage("Name is required"),

    body('mobile_no').exists().withMessage("Mobile number is required")
        .isLength({ min: 10, max: 10 }).withMessage("Mobile number must be 10 digits")
        .matches(/^[0-9]{10}$/).withMessage("Invalid number")
        .custom((value) => {
            // ❌ reject all same digits (1111111111, 0000000000)
            if (/^(\d)\1{9}$/.test(value)) {
                throw new Error("Number cannot have all identical digits");
            }

            // ❌ reject ascending sequence (1234567890)
            if ("0123456789".includes(value)) {
                throw new Error("Sequential numbers are not allowed");
            }

            // ❌ reject descending sequence (9876543210)
            if ("9876543210".includes(value)) {
                throw new Error("Sequential numbers are not allowed");
            }
            if (/^(\d{2,})\1+$/.test(value)) {
                throw new Error("Repeating patterns are not allowed");
            }

            return true;
        })

]

export const kycMiddelware = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}