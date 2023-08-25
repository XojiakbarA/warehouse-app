import Typography from "@mui/material/Typography";
import {Grid, Paper} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import MainGridToolbar from "../components/data-grid/MainGridToolbar";
import {useCallback, useEffect, useState} from "react";
import WarehouseDialog from "../components/dialogs/WarehouseDialog";
import DeleteDialog from "../components/dialogs/DeleteDialog";
import {deleteWarehouse, fetchWarehouses, saveWarehouse, updateWarehouse} from "../api";
import {useSearchParams} from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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

    const pageSizeOptions = [10, 20, 30]

    const [searchParams, setSearchParams] = useSearchParams()

    const paginationModel = {
        page: Number(searchParams.get("page")) || 0,
        pageSize: Number(searchParams.get("pageSize")) || pageSizeOptions[0]
    }
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState({ content: [], rowCount: 0})
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const [rowSelectionModel, setRowSelectionModel] = useState([])
    const warehouse = data?.content.find(w => w.id === rowSelectionModel[0]) || null

    const getWarehouses = useCallback(async () => {
        setLoading(true)
        try {
            const params = {page: paginationModel.page, size: paginationModel.pageSize}
            const { data } = await fetchWarehouses(params);
            const content = data.data.content
            const rowCount = data.data.totalElements
            setData({ content, rowCount })
        } catch (e) {
            console.log(e)
            setError(e.response?.data?.message)
        }
        setLoading(false)
    }, [paginationModel.page, paginationModel.pageSize])

    const handleCreateSubmit = async (data, { resetForm }) => {
        setLoading(true)
        try {
            await saveWarehouse(data)
            await getWarehouses()
            toggleAddDialog()
            resetForm()
        } catch (e) {
            console.log(e)
            setError(e.response?.data?.message)
        }
        setLoading(false)
    }
    const handleEditSubmit = async (data, { resetForm }) => {
        setLoading(true)
        try {
            await updateWarehouse(warehouse?.id, data)
            await getWarehouses()
            toggleEditDialog()
            resetForm()
            setRowSelectionModel([])
        } catch (e) {
            console.log(e)
            setError(e.response?.data?.message)
        }
        setLoading(false)
    }
    const handleDeleteClick = async () => {
        setLoading(true)
        try {
            await deleteWarehouse(warehouse?.id)
            await getWarehouses()
            toggleDeleteDialog()
            setRowSelectionModel([])
        } catch (e) {
            console.log(e)
            setError(e.response.data.message)
        }
        setLoading(false)
    }

    const handleRowSelectionModelChange = (r) => {
        setRowSelectionModel(i => {
            if (i[0] === r[0]) {
                return []
            }
            return r
        })
    }
    const toggleAddDialog = () => {
        setAddDialogOpen(addDialogOpen => !addDialogOpen)
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

    useEffect(() => {
        getWarehouses()
    }, [getWarehouses])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={"h4"} color={"primary"}>Warehouses</Typography>
            </Grid>
            <Grid item xs={12}>
                <Collapse in={Boolean(error)}>
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => setError(null)}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        <AlertTitle>Error</AlertTitle>
                        {error}
                    </Alert>
                </Collapse>
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
                        rowSelectionModel={rowSelectionModel}
                        onRowSelectionModelChange={handleRowSelectionModelChange}
                        pageSizeOptions={pageSizeOptions}
                        onPaginationModelChange={handlePaginationModelChange}
                        slots={{ toolbar: MainGridToolbar }}
                        slotProps={{
                            toolbar: {
                                loading: loading,
                                disabledAddButton: Boolean(error),
                                disabled: !Boolean(warehouse),
                                onAddButtonClick: toggleAddDialog,
                                onEditButtonClick: toggleEditDialog,
                                onDeleteButtonClick: toggleDeleteDialog
                            }
                        }}
                        hideFooter={loading || Boolean(error)}
                    />
                </Paper>
            </Grid>
            <WarehouseDialog
                title={"Add Warehouse"}
                open={addDialogOpen}
                onClose={toggleAddDialog}
                initialValues={{ name: "", active: true }}
                onSubmit={handleCreateSubmit}
                loading={loading}
            />
            <WarehouseDialog
                title={"Edit Warehouse"}
                open={editDialogOpen}
                onClose={toggleEditDialog}
                initialValues={{ name: warehouse?.name || "", active: warehouse?.active || false }}
                onSubmit={handleEditSubmit}
                loading={loading}
            />
            <DeleteDialog
                title={"Delete Warehouse"}
                open={deleteDialogOpen}
                onClose={toggleDeleteDialog}
                resourceName={warehouse?.name || ""}
                onDeleteClick={handleDeleteClick}
                loading={loading}
            />
        </Grid>
    )
}

export default Warehouses