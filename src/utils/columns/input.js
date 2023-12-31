import {Button} from "@mui/material";
import {Link} from "react-router-dom";

export const inputColumns = [
    {
        field: 'id',
        headerName: 'ID',
        type: "number",
        filterable: false,
        sortable: false
    },
    {
        field: 'date',
        minWidth: 200,
        headerName: "Date",
        type: "dateTime",
        filterable: false,
        sortable: false,
        valueGetter: ({ value }) => value && new Date(value)
    },
    {
        field: 'warehouse',
        minWidth: 200,
        headerName: "Warehouse Name",
        type: "string",
        filterable: false,
        sortable: false,
        valueGetter: ({ value }) => value && value.name
    },
    {
        field: 'supplier',
        minWidth: 200,
        headerName: "Supplier Name",
        type: "string",
        filterable: false,
        sortable: false,
        valueGetter: ({ value }) => value && value.name
    },
    {
        field: 'currency',
        minWidth: 100,
        headerName: "Currency",
        type: "string",
        filterable: false,
        sortable: false,
        valueGetter: ({ value }) => value && value.currencyCode
    },
    {
        field: 'factureNumber',
        minWidth: 150,
        headerName: "Facture Number",
        type: "number",
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
        field: 'inputProducts',
        minWidth: 150,
        headerName: "Products",
        type: "string",
        filterable: false,
        sortable: false,
        renderCell: (params) => {
            return (
                <Button
                    size={"small"}
                    component={Link}
                    to={"/inputs/" + params.id + "/input-products"}
                >
                    View
                </Button>
            )
        }
    }
]