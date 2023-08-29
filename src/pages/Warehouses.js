import Typography from "@mui/material/Typography";
import {Grid, Paper} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import MainGridToolbar from "../components/data-grid/MainGridToolbar";
import {useCallback, useEffect, useState} from "react";
import AbstractDialog from "../components/dialogs/AbstractDialog";
import DeleteDialog from "../components/dialogs/DeleteDialog";
import {deleteWarehouse, fetchWarehouses, saveWarehouse, updateWarehouse} from "../api";
import {useSearchParams} from "react-router-dom";
import {mainColumns, pageSizeOptions} from "../utils/constants";
import MainAlert from "../components/alerts/MainAlert";

const Warehouses = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const paginationModel = {
        page: Number(searchParams.get("page")) || 0,
        pageSize: Number(searchParams.get("pageSize")) || pageSizeOptions[0]
    }
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)
    const [warehouses, setWarehouses] = useState([])
    const [rowCount, setRowCount] = useState(0)
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const [rowSelectionModel, setRowSelectionModel] = useState([])
    const [warehouse, setWarehouse] = useState(null)

    const getWarehouses = useCallback(async () => {
        setLoading(true)
        try {
            const params = {page: paginationModel.page, size: paginationModel.pageSize}
            const { data } = await fetchWarehouses(params)
            setWarehouses(data.data.content)
            setRowCount(data.data.totalElements)
        } catch (e) {
            console.log(e)
            setError(e.response?.data?.message)
        }
        setLoading(false)
    }, [paginationModel.page, paginationModel.pageSize])

    const handleCreateSubmit = async (data, { resetForm }) => {
        setLoading(true)
        try {
            const res = await saveWarehouse(data)
            if (res.status === 201) {
                await getWarehouses()
                toggleAddDialog()
                resetForm()
                setSuccess("Warehouse created successfully")
            }
        } catch (e) {
            console.log(e)
            setError(e.response?.data?.message)
        }
        setLoading(false)
    }
    const handleEditSubmit = async (data, { resetForm }) => {
        setLoading(true)
        try {
            const res = await updateWarehouse(warehouse?.id, data)
            if (res.status === 200) {
                await getWarehouses()
                toggleEditDialog()
                resetForm()
                setRowSelectionModel([])
                setSuccess("Warehouse updated successfully")
            }
        } catch (e) {
            console.log(e)
            setError(e.response?.data?.message)
        }
        setLoading(false)
    }
    const handleDeleteClick = async () => {
        setLoading(true)
        try {
            const res = await deleteWarehouse(warehouse?.id)
            if (res.status === 202) {
                await getWarehouses()
                toggleDeleteDialog()
                setRowSelectionModel([])
                setSuccess("Warehouse deleted successfully")
            }
        } catch (e) {
            console.log(e)
            setError(e.response.data.message)
        }
        setLoading(false)
    }

    const handleRowSelectionModelChange = (r) => {
        setRowSelectionModel(i => {
            if (i[0] === r[0]) {
                setWarehouse(null)
                return []
            }
            const warehouse = warehouses.find(w => w.id === r[0])
            setWarehouse(warehouse || null)
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
                <MainAlert
                    error={error}
                    onErrorCloseClick={() => setError(null)}
                    success={success}
                    onSuccessCloseClick={() => setSuccess(null)}
                />
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <DataGrid
                        autoHeight
                        disableColumnMenu
                        loading={loading}
                        columns={mainColumns}
                        rows={warehouses}
                        paginationMode={"server"}
                        paginationModel={paginationModel}
                        rowCount={rowCount}
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
            <AbstractDialog
                title={"Add Warehouse"}
                open={addDialogOpen}
                onClose={toggleAddDialog}
                initialValues={{ name: "", active: true }}
                onSubmit={handleCreateSubmit}
                loading={loading}
            />
            <AbstractDialog
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