import Typography from "@mui/material/Typography";
import {Grid, Paper} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import MainGridToolbar from "../components/data-grid/MainGridToolbar";
import {useState} from "react";
import WarehouseDialog from "../components/dialogs/WarehouseDialog";
import DeleteDialog from "../components/dialogs/DeleteDialog";

const Warehouses = () => {

    const warehouses = [
        {id: "1", name: "Warehouse1"},
        {id: "2", name: "Warehouse2"},
        {id: "3", name: "Warehouse3"},
        {id: "4", name: "Warehouse4"},
        {id: "5", name: "Warehouse5"},
    ]

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            type: "number",
            filterable: false,
            sortable: false
        },
        {
            field: 'name',
            headerName: "Name",
            type: "string",
            filterable: false,
            sortable: false
        }
    ]

    const [warehouse, setWarehouse] = useState(null)

    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const handleRowClick = (p) => {
        setWarehouse(p.row)
    }
    const toggleEditDialog = () => {
        setEditDialogOpen(editDialogOpen => !editDialogOpen)
    }
    const toggleDeleteDialog = () => {
        setDeleteDialogOpen(deleteDialogOpen => !deleteDialogOpen)
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={"h4"} color={"primary"}>Warehouses</Typography>
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <DataGrid
                        autoHeight
                        disableColumnMenu
                        loading={false}
                        columns={columns}
                        rows={warehouses}
                        onRowClick={handleRowClick}
                        components={{Toolbar: MainGridToolbar}}
                        componentsProps={{
                            toolbar: {
                                disabled: !Boolean(warehouse),
                                onEditButtonClick: toggleEditDialog,
                                onDeleteButtonClick: toggleDeleteDialog
                            }
                        }}
                    />
                </Paper>
            </Grid>
            <WarehouseDialog
                open={editDialogOpen}
                onClose={toggleEditDialog}
                warehouse={warehouse}
            />
            <DeleteDialog
                open={deleteDialogOpen}
                onClose={toggleDeleteDialog}
                resourceName={warehouse?.name}
            />
        </Grid>
    )
}

export default Warehouses