export const inputProductColumns = [
    {
        field: 'id',
        headerName: 'ID',
        type: "number",
        filterable: false,
        sortable: false
    },
    {
        field: 'product',
        minWidth: 200,
        headerName: "Product Name",
        type: "string",
        filterable: false,
        sortable: false,
        valueGetter: ({ row }) => row.product && row.product.name
    },
    {
        field: 'amount',
        minWidth: 200,
        headerName: "Amount",
        type: "number",
        filterable: false,
        sortable: false
    },
    {
        field: 'remaining',
        minWidth: 150,
        headerName: "Remaining",
        type: "number",
        filterable: false,
        sortable: false
    },
    {
        field: 'price',
        minWidth: 200,
        headerName: "Price",
        type: "number",
        filterable: false,
        sortable: false
    },
    {
        field: 'expireDate',
        minWidth: 200,
        headerName: "Expire Date",
        type: "dateTime",
        filterable: false,
        sortable: false,
        valueGetter: ({ value }) => value && new Date(value)
    }
]