import * as yup from 'yup'

export const warehouseValidationSchema = yup.object({
    name: yup
        .string('Enter Name')
        .required('Name is required')
})