// import { z } from 'zod'

// export const ClientRegisterValidate = z.object({
//     phFirstName: z.string().min(1),
//     phMiddleName: z.string().optional(),
//     phLastName: z.string().min(1),
//     firstApplicantDOB: z.string().min(1),
//     firstApplicantGendar: z.string().min(1),
//     firstApplicantOccupation: z.string().min(1),
//     firstApplicantPanNo: z.string().length(10).regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN Format"),
//     tax_status: z.string().optional(),
//     holdingNature: z.string().optional(),
//     address_1: z.string().min(5, "Address must be 5 characters").max(200),
//     address_2: z.string().optional().min(5, "Address must be atleast 5 characters").max(200),
//     address_3: z.string().optional().min(5, "Address must be atleast 5 characters").max(200),
//     city: z.string().min(1).regex(/^[A-Za-z\s]+$/, "Use Alphabets only"),
//     state: z.string().min(1).regex(/^[A-Za-z\s]+$/, "Use Alphabets only"),
//     pincode: z.string().min(1).regex(/^[0-9]$/),
//     country: z.string().min(1).regex(/^[A-Za-z\s]+$/, "Use Alphabets only"),
//     email: z.email({ message: "Invalid Email address" }).toLowerCase(),
//     indian_mobile_no: z.string().optional(),
//     nominee_1_name: z.string().min(1),
//     nominee_1_relationship: z.string().min(1),
//     nominee_per_1: z.string().min(1),
//     nomineeIdentifyType1: z.string().min(1),
//     nomineeIdentifyNo1: z.string().min(1),
//     nomineeDOB1: z.date().min(1),
//     nomineeEmail1: z.email({ message: "Invalid email Format" }).toLowerCase(),
//     nomineeMobile1: z.string().length(10).regex(/^[0-9]{10}$/, "Must be 10 digits"),
//     bankAccTypeMfd: z.string().min(1),
//     ifsc_code_1: z.string().length(11).regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code"),
//     micrNomfd: z.string().length(9).regex(/^[0-9]{9}$/, "Invalid MICR Code"),
//     bankName: z.string().min(1),
//     chequeName: z.string().optional(),
//     bankAccNomfd: z.string().optional(1),
//     defaultBankMfd: z.boolean().min(1),
//     bankAccTypeMfd2: z.boolean().optional(),
//     ifsc_code_2: z.string().optional(),
//     micrNomfd2: z.string().optional(),
//     bankName2: z.string().optional(),
//     chequeName1: z.string().optional(),
//     bankAccNoMfd2: z.string().optional(),
//     defaultBankMfd2: z.string().optional(),
//     false: z.string().optional(),
//     nomineeName2: z.string().optional(),
//     nomineeRelation2: z.string().optional(),
//     nomineePer2: z.number().optional(),
//     nomineeIdentifyType2: z.string().optional(),
//     nomineeIdentifyNo2: z.string().optional(),
//     nomineeDOB2: z.string().optional(),
//     nomineeEmail2: z.string().optional(),
//     nomineeMobile2: z.string().optional(),
//     check_kyc_id: z.string().optional(),










// })
import { z } from "zod";

export const ClientRegisterValidate = z.object({

    // PERSONAL DETAILS
    phFirstName: z.string().trim().min(1, "First name is required"),
    phMiddleName: z.string().trim().optional(),
    phLastName: z.string().trim().min(1, "Last name is required"),

    firstApplicantDOB: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Invalid date format" }
    ),

    firstApplicantGendar: z.enum(["male", "female", "other"]),
    firstApplicantOccupation: z.string().trim().min(1, "Occupation is required"),

    firstApplicantPanNo: z.string()
        .toUpperCase()
        .length(10, "PAN must be 10 characters")
        .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN format")
        .trim(),

    tax_status: z.string().optional(),
    holdingNature: z.string().optional(),

    // ADDRESS
    address_1: z.string().trim().min(5, "Address too short").max(200),
    address_2: z.string().trim().optional(),
    address_3: z.string().trim().optional(),

    city: z.string().trim().min(1).regex(/^[A-Za-z\s]+$/, "Use alphabets only"),
    state: z.string().trim().min(1).regex(/^[A-Za-z\s]+$/, "Use alphabets only"),

    pincode: z.string().regex(/^[0-9]{6}$/, "Invalid pincode"),

    country: z.string().trim().min(1).regex(/^[A-Za-z\s]+$/, "Use alphabets only"),

    email: z.string()
        .trim()
        .toLowerCase()
        .email("Invalid email address"),

    indian_mobile_no: z.string()
        .regex(/^[0-9]{10}$/, "Invalid mobile number")
        .optional()
        .or(z.literal("")),

    // NOMINEE 1
    nominee_1_name: z.string().trim().min(1, "Nominee name is required"),
    nominee_1_relationship: z.string().trim().min(1, "Relationship is required"),
    nominee_per_1: z.string().optional(),


    nomineeIdentifyNo1: z.enum([
        "AADHAAR",
        "DRIVING LICENSE",
        "PAN",
        "OCI/PASSPORT"
    ]),

    nomineeIdentifyNo1: z.string().trim().min(1, "Identity number is required"),

    nomineeCountry_1: z.string().optional(),

    nomineeDOB1: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Invalid nominee DOB" }
    ),

    nomineeEmail1: z.string()
        .email("Invalid email")
        .optional()
        .or(z.literal("")),

    nomineeMobile1: z.string()
        .regex(/^[0-9]{10}$/, "Invalid mobile number")
        .optional()
        .or(z.literal("")),

    // BANK DETAILS 1
    bankAccTypeMfd: z.enum(["SAVING", "CURRENT"]),

    ifsc_code_1: z.string()
        .toUpperCase()
        .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),

    micrNoMfd: z.string()
        .regex(/^[0-9]{9}$/, "Invalid MICR code"),

    bankName: z.string().trim().min(1, "Bank name is required"),
    chequeName: z.string().trim().min(1, "Cheque name is required"),
    bankAccNoMfd: z.string().regex(/^\d+$/, "Account number must contain only digits").min(5, "Invalid account number").trim(),

    defaultBankMfd: z.coerce.boolean(),

    // BANK DETAILS 2 (Optional)
    bankAccTypeMfd2: z.enum(["SAVING", "CURRENT"]).optional(),
    ifsc_code_2: z.string().toUpperCase().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/).optional(),
    micrNomfd2: z.string().regex(/^[0-9]{9}$/).optional(),
    bankName2: z.string().optional(),
    chequeName1: z.string().optional(),
    bankAccNoMfd2: z.string().optional(),
    defaultBankMfd2: z.coerce.boolean().optional(),

    // NOMINEE 2 (Optional)
    nomineeName2: z.string().optional(),
    nomineeRelation2: z.string().optional(),
    nomineePer2: z.number().optional(),

    nomineeIdentifyType2: z.enum([
        "AADHAAR",
        "DRIVING LICENSE",
        "PAN",
        "OCI/PASSPORT"
    ]).optional(),

    nomineeIdentifyNo2: z.string().optional(),

    nomineeDOB2: z.string().optional(),
    nomineeEmail2: z.string().email().optional(),
    nomineeMobile2: z.string().regex(/^[0-9]{10}$/).optional(),

    // OTHER
    check_kyc_id: z.string().optional(),

}).superRefine((data, ctx) => {

    // 🔥 Dynamic validation for Nominee 1
    if (data.nomineeIdentifyType1 === "AADHAAR") {
        if (!/^[0-9]{12}$/.test(data.nomineeIdentifyNo1)) {
            ctx.addIssue({
                path: ["nomineeIdentifyNo1"],
                message: "Aadhaar must be 12 digits",
                code: "custom"
            });
        }
    }

    if (data.nomineeIdentifyType1 === "PAN") {
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(data.nomineeIdentifyNo1)) {
            ctx.addIssue({
                path: ["nomineeIdentifyNo1"],
                message: "Invalid PAN format",
                code: "custom"
            });
        }
    }

});