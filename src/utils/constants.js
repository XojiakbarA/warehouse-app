import {Button} from "@mui/material";
import {Link} from "react-router-dom";

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

export const productColumns = [
    ...mainColumns,
    {
        field: 'category',
        minWidth: 200,
        headerName: "Product Name",
        type: "string",
        filterable: false,
        sortable: false,
        valueGetter: (params) => {
            if (params.row.category) {
                return params.row.category.name
            }
            return "-"
        }
    },
    {
        field: 'code',
        minWidth: 200,
        headerName: "Code",
        type: "string",
        filterable: false,
        sortable: false
    },
    {
        field: 'measurement',
        minWidth: 200,
        headerName: "Measurement Name",
        type: "string",
        filterable: false,
        sortable: false,
        valueGetter: (params) => {
            if (params.row.measurement) {
                return params.row.measurement.name
            }
            return "-"
        }
    },
    {
        field: 'photo',
        minWidth: 200,
        headerName: "Photo",
        type: "string",
        filterable: false,
        sortable: false,
        renderCell: (params) => {
            const photo = params.row.photo
            if (photo) {
                return (
                    <Button
                        size={"small"}
                        component={Link}
                        to={"http://localhost:8080/attachments/download/" + photo.id}
                    >
                        Download Photo
                    </Button>)
            } else {
                return null
            }
        }
    },
]

export const pageSizeOptions = [10, 20, 30]