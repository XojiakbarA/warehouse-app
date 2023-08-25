import Typography from "@mui/material/Typography";
import {Grid, Paper} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import MainGridToolbar from "../components/data-grid/MainGridToolbar";
import {useEffect, useState} from "react";
import WarehouseDialog from "../components/dialogs/WarehouseDialog";
import DeleteDialog from "../components/dialogs/DeleteDialog";
import {fetchWarehouses} from "../api";
import {useSearchParams} from "react-router-dom";

const Warehouses = () => {

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
            minWidth: 200,
            headerName: "Name",
            type: "string",
            filterable: false,
            sortable: false
        }
    ]

    const [warehouse, setWarehouse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        content: [],
        rowCount: 0
    })
    const [searchParams, setSearchParams] = useSearchParams()
    const pageSizeOptions = [10, 20, 30]
    const paginationModel = {
        page: Number(searchParams.get("page")) || 0,
        pageSize: Number(searchParams.get("pageSize")) || pageSizeOptions[0]}

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
    const handlePaginationModelChange = (paginationModel) => {
        setSearchParams(paginationModel)
    }

    const getWarehouses = async () => {
        const params = {page: paginationModel.page, size: paginationModel.pageSize}
        setLoading(true)
        const { data } = await fetchWarehouses(params);
        const content = data.data.content
        const rowCount = data.data.totalElements
        setData({ content, rowCount })
        setLoading(false)
    }

    useEffect(() => {
        getWarehouses()
    }, [paginationModel.page, paginationModel.pageSize])

    console.log(loading)

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
                        loading={loading}
                        columns={columns}
                        rows={data.content}
                        paginationMode={"server"}
                        paginationModel={paginationModel}
                        rowCount={data.rowCount}
                        pageSizeOptions={pageSizeOptions}
                        onPaginationModelChange={handlePaginationModelChange}
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