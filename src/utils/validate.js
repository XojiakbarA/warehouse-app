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