import {useSearchParams} from "react-router-dom";
import {pageSizeOptions} from "../utils/constants";
import {useCallback, useEffect, useState} from "react";
import {deleteInput, fetchInputs, saveInput, updateInput} from "../api";
import {Grid, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import MainAlert from "../components/alerts/MainAlert";
import {DataGrid} from "@mui/x-data-grid";
import MainGridToolbar from "../components/data-grid/MainGridToolbar";
import DeleteDialog from "../components/dialogs/DeleteDialog";
import {inputColumns} from "../utils/columns/input";
import InputDialog from "../components/dialogs/InputDialog";

const Inputs = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const paginationModel = {
        page: Number(searchParams.get("page")) || 0,
        pageSize: Number(searchParams.get("pageSize")) || pageSizeOptions[0]
    }
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState([])
    const [rowCount, setRowCount] = useState(0)
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const [rowSelectionModel, setRowSelectionModel] = useState([])
    const [input, setInput] = useState(null)

    const [warehouse, setWarehouse] = useState(null)
    const [supplier, setSupplier] = useState(null)
    const [currency, setCurrency] = useState(null)

    const getInputs = useCallback(async () => {
        setLoading(true)
        try {
            const params = {page: paginationModel.page, size: paginationModel.pageSize}
            const { data } = await fetchInputs(params)
            setInputs(data.data.content)
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
            const res = await saveInput(data)
            if (res.status === 201) {
                await getInputs()
                toggleAddDialog()
                resetForm()
                setSuccess("Input created successfully")
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
            const res = await updateInput(input?.id, data)
            if (res.status === 200) {
                await getInputs()
                toggleEditDialog()
                resetForm()
                setRowSelectionModel([])
                setInput(null)
                setWarehouse(null)
                setSupplier(null)
                setCurrency(null)
                setSuccess("Input updated successfully")
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
            const res = await deleteInput(input?.id)
            if (res.status === 202) {
                await getInputs()
                toggleDeleteDialog()
                setRowSelectionModel([])
                setInput(null)
                setWarehouse(null)
                setSupplier(null)
                setCurrency(null)
                setSuccess("Input deleted successfully")
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
                setInput(null)
                setWarehouse(null)
                setSupplier(null)
                setCurrency(null)
                return []
            }
            const input = inputs.find(w => w.id === r[0])
            setInput(input || null)
            setWarehouse(input?.warehouse || null)
            setSupplier(input?.supplier || null)
            setCurrency(input?.currency || null)
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
        getInputs()
    }, [getInputs])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={"h4"} color={"primary"} marginTop>Inputs</Typography>
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
                        columns={inputColumns}
                        rows={inputs}
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
                                disabled: !Boolean(input),
                                onAddButtonClick: toggleAddDialog,
                                onEditButtonClick: toggleEditDialog,
                                onDeleteButtonClick: toggleDeleteDialog
                            }
                        }}
                        hideFooter={loading || Boolean(error)}
                    />
                </Paper>
            </Grid>
            <InputDialog
                title={"Add Input"}
                open={addDialogOpen}
                onClose={toggleAddDialog}
                initialValues={{
                    warehouseId: null,
                    supplierId: null,
                    currencyId: null,
                    factureNumber : "",
                    date: null
                }}
                onSubmit={handleCreateSubmit}
                loading={loading}
                warehouse={warehouse}
                setWarehouse={setWarehouse}
                supplier={supplier}
                setSupplier={setSupplier}
                currency={currency}
                setCurrency={setCurrency}
            />
            <InputDialog
                title={"Edit Input"}
                open={editDialogOpen}
                onClose={toggleEditDialog}
                initialValues={{
                    warehouseId: input?.warehouse?.id || null,
                    supplierId: input?.supplier?.id || null,
                    currencyId: input?.currency?.id || null,
                    factureNumber : input?.factureNumber || "",
                    date: input?.date || null
                }}
                onSubmit={handleEditSubmit}
                loading={loading}
                warehouse={warehouse}
                setWarehouse={setWarehouse}
                supplier={supplier}
                setSupplier={setSupplier}
                currency={currency}
                setCurrency={setCurrency}
            />
            <DeleteDialog
                title={"Delete Input"}
                open={deleteDialogOpen}
                onClose={toggleDeleteDialog}
                resourceName={input?.code || ""}
                onDeleteClick={handleDeleteClick}
                loading={loading}
            />
        </Grid>
    )
}

export default Inputs