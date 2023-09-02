import {mainColumns} from "./main";
import {Button} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import {Link} from "react-router-dom";

export const productColumns = [
    ...mainColumns,
    {
        field: 'remaining',
        minWidth: 150,
        headerName: "Remaining",
        type: "number",
        filterable: false,
        sortable: false
    },
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
        minWidth: 250,
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
        minWidth: 150,
        headerName: "Photo",
        type: "string",
        filterable: false,
        sortable: false,
        renderCell: (params) => {
            const photo = params.row.photo
            if (photo) {
                return (
                    <Button
                        startIcon={<DownloadIcon/>}
                        size={"small"}
                        component={Link}
                        to={"http://localhost:8080/attachments/download/" + photo.id}
                    >
                        Photo
                    </Button>)
            } else {
                return "-"
            }
        }
    },
]