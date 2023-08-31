
export const userColumns = [
    {
        field: 'id',
        headerName: 'ID',
        type: "number",
        filterable: false,
        sortable: false
    },
    {
        field: 'firstName',
        minWidth: 200,
        headerName: "First Name",
        type: "string",
        filterable: false,
        sortable: false
    },
    {
        field: 'lastName',
        minWidth: 200,
        headerName: "Last Name",
        type: "string",
        filterable: false,
        sortable: false
    },
    {
        field: 'phoneNumber',
        minWidth: 200,
        headerName: "Phone Number",
        type: "string",
        filterable: false,
        sortable: false
    },
    {
        field: 'code',
        minWidth: 250,
        headerName: "Code",
        type: "string",
        filterable: false,
        sortable: false
    },
    {
        field: 'warehouses',
        minWidth: 200,
        headerName: "Warehouses",
        type: "string",
        filterable: false,
        sortable: false,
        valueGetter: ({ value }) => {
            if (value) {
                return value.map(i => i.name).join(", ")
            }
        }
    },
    {
        field: 'active',
        minWidth: 200,
        headerName: "Active",
        type: "boolean",
        filterable: false,
        sortable: false
    }
]