
export const mainColumns = [
    {
        field: 'id',
        headerName: 'ID',
        type: "number",
        filterable: false,
        sortable: false
    },
    {
        field: 'name',
        minWidth: 200,
        headerName: "Name",
        type: "string",
        filterable: false,
        sortable: false
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

export const categoryColumns = [
    ...mainColumns,
    {
        field: 'parentCategory',
        minWidth: 200,
        headerName: "Parent Category",
        type: "string",
        filterable: false,
        sortable: false,
        valueGetter: (params) => {
            if (params.row.parentCategory) {
                return params.row.parentCategory.name
            }
            return "-"
        }
    }
]

export const supplierClientColumns = [
    ...mainColumns,
    {
        field: 'phoneNumber',
        minWidth: 200,
        headerName: "Phone Number",
        type: "string",
        filterable: false,
        sortable: false
    }
]

export const pageSizeOptions = [10, 20, 30]