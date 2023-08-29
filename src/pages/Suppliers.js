import Typography from "@mui/material/Typography";
import {Grid, Paper} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import MainGridToolbar from "../components/data-grid/MainGridToolbar";
import {useCallback, useEffect, useState} from "react";
import DeleteDialog from "../components/dialogs/DeleteDialog";
import {deleteSupplier, fetchSuppliers, saveSupplier, updateSupplier} from "../api";
import {useSearchParams} from "react-router-dom";
import {pageSizeOptions, supplierClientColumns} from "../utils/constants";
import MainAlert from "../components/alerts/MainAlert";
import SupplierClientDialog from "../components/dialogs/SupplierClientDialog";

const Suppliers = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const paginationModel = {
        page: Number(searchParams.get("page")) || 0,
        pageSize: Number(searchParams.get("pageSize")) || pageSizeOptions[0]
    }
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)
    const [suppliers, setSuppliers] = useState([])
    const [rowCount, setRowCount] = useState(0)
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const [rowSelectionModel, setRowSelectionModel] = useState([])
    const [supplier, setSupplier] = useState(null)

    const getSuppliers = useCallback(async () => {
        setLoading(true)
        try {
            const params = {page: paginationModel.page, size: paginationModel.pageSize}
            const { data } = await fetchSuppliers(params)
            setSuppliers(data.data.content)
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
            const res = await saveSupplier(data)
            if (res.status === 201) {
                await getSuppliers()
                toggleAddDialog()
                resetForm()
                setSuccess("Supplier created successfully")
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
            const res = await updateSupplier(supplier?.id, data)
            if (res.status === 200) {
                await getSuppliers()
                toggleEditDialog()
                resetForm()
                setRowSelectionModel([])
                setSuccess("Supplier updated successfully")
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
            const res = await deleteSupplier(supplier?.id)
            if (res.status === 202) {
                await getSuppliers()
                toggleDeleteDialog()
                setRowSelectionModel([])
                setSuccess("Supplier deleted successfully")
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
                setSupplier(null)
                return []
            }
            const supplier = suppliers.find(s => s.id === r[0])
            setSupplier(supplier || null)
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
        getSuppliers()
    }, [getSuppliers])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={"h4"} color={"primary"} marginTop>Suppliers</Typography>
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
                        columns={supplierClientColumns}
                        rows={suppliers}
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
                                disabled: !Boolean(supplier),
                                onAddButtonClick: toggleAddDialog,
                                onEditButtonClick: toggleEditDialog,
                                onDeleteButtonClick: toggleDeleteDialog
                            }
                        }}
                        hideFooter={loading || Boolean(error)}
                    />
                </Paper>
            </Grid>
            <SupplierClientDialog
                title={"Add Supplier"}
                open={addDialogOpen}
                onClose={toggleAddDialog}
                initialValues={{ name: "", active: true, phoneNumber: "" }}
                onSubmit={handleCreateSubmit}
                loading={loading}
            />
            <SupplierClientDialog
                title={"Edit Supplier"}
                open={editDialogOpen}
                onClose={toggleEditDialog}
                initialValues={{ name: supplier?.name || "", active: supplier?.active || false, phoneNumber: supplier?.phoneNumber || "" }}
                onSubmit={handleEditSubmit}
                loading={loading}
            />
            <DeleteDialog
                title={"Delete Supplier"}
                open={deleteDialogOpen}
                onClose={toggleDeleteDialog}
                resourceName={supplier?.name || ""}
                onDeleteClick={handleDeleteClick}
                loading={loading}
            />
        </Grid>
    )
}

export default Suppliers