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

export const productValidationSchema = yup.object({
    name: yup
        .string('Enter Name')
        .required('Name is required'),
    categoryId: yup
        .number('Select Category')
        .required('Category is required'),
    measurementId: yup
        .number('Select Measurement')
        .required('Measurement is required')
})

export const inputValidationSchema = yup.object({
    factureNumber: yup
        .number('Enter Facture Number')
        .required('Facture Number is required'),
    date: yup
        .string('Enter Date')
        .required('Date is required'),
    warehouseId: yup
        .number('Select Warehouse')
        .required('Warehouse is required'),
    supplierId: yup
        .number('Select Supplier')
        .required('Supplier is required'),
    currencyId: yup
        .number('Select Currency')
        .required('Currency is required')
})

export const inputProductValidationSchema = yup.object({
    price: yup
        .number('Enter Price')
        .required('Price is required'),
    expireDate: yup
        .string('Enter Expire Date')
        .required('Expire Date is required'),
    productId: yup
        .number('Select Product')
        .required('Product is required'),
    inputId: yup
        .number('Select Input')
        .required('Input is required'),
    amount: yup
        .number('Enter Amount')
        .required('Amount is required')
        .positive('Amount must me positive')
})

export const outputValidationSchema = yup.object({
    factureNumber: yup
        .number('Enter Facture Number')
        .required('Facture Number is required'),
    date: yup
        .string('Enter Date')
        .required('Date is required'),
    warehouseId: yup
        .number('Select Warehouse')
        .required('Warehouse is required'),
    clientId: yup
        .number('Select Client')
        .required('Client is required'),
    currencyId: yup
        .number('Select Currency')
        .required('Currency is required')
})

export const outputProductValidationSchema = (maxAmountValue) => yup.object({
    price: yup
        .number('Enter Price')
        .required('Price is required'),
    inputProductId: yup
        .number('Select Input Product')
        .required('Input Product is required'),
    outputId: yup
        .number('Select Output')
        .required('Output is required'),
    amount: yup
        .number('Enter Amount')
        .required('Amount is required')
        .positive('Amount must me positive')
        .max(maxAmountValue, 'Max value must be ' + maxAmountValue)
})

export const userCreateValidationSchema = yup.object({
    firstName: yup
        .string('Enter First Name')
        .required('First Name is required'),
    lastName: yup
        .string('Enter Last Name')
        .required('Last Name is required'),
    phoneNumber: yup
        .string('Enter Phone Number')
        .required('Phone Number is required')
        .min(9, "Must be exactly 9 digits")
        .max(9, "Must be exactly 9 digits"),
    password: yup
        .string('Enter Password')
        .required('Password is required'),
    warehouseIds: yup
        .array()
        .min(1, "Must be min 1 warehouses")
        .required('Warehouses is required')
})
export const userEditValidationSchema = yup.object({
    firstName: yup
        .string('Enter First Name')
        .required('First Name is required'),
    lastName: yup
        .string('Enter Last Name')
        .required('Last Name is required'),
    phoneNumber: yup
        .string('Enter Phone Number')
        .required('Phone Number is required')
        .min(9, "Must be exactly 9 digits")
        .max(9, "Must be exactly 9 digits"),
    warehouseIds: yup
        .array()
        .min(1, "Must be min 1 warehouses")
        .required('Warehouses is required')
})