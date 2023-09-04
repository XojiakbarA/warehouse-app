export const outputProductColumns = [
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
        valueGetter: ({ row }) => row.inputProduct && row.inputProduct.product.name
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
        field: 'price',
        minWidth: 200,
        headerName: "Price",
        type: "number",
        filterable: false,
        sortable: false
    }
]