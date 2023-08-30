import {mainColumns} from "./main";

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