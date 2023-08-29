import * as yup from 'yup'

export const mainValidationSchema = yup.object({
    name: yup
        .string('Enter Name')
        .required('Name is required')
})

export const currencyValidationSchema = yup.object({
    currencyCode: yup
        .string('Select Currency')
        .required('Currency is required')
})

export const supplierClientValidationSchema = yup.object({
    name: yup
        .string('Enter Name')
        .required('Name is required'),
    phoneNumber: yup
        .string('Enter Phone Number')
        .required('Phone Number is required')
        .min(9, "Must be exactly 9 digits")
        .max(9, "Must be exactly 9 digits"),
})