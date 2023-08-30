import {mainColumns} from "./main";

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