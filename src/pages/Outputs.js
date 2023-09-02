import {useSearchParams} from "react-router-dom";
import {pageSizeOptions} from "../utils/constants";
import {useCallback, useEffect, useState} from "react";
import {deleteOutput, fetchOutputs, saveOutput, updateOutput} from "../api";
import {Grid, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import MainAlert from "../components/alerts/MainAlert";
import {DataGrid} from "@mui/x-data-grid";
import MainGridToolbar from "../components/data-grid/MainGridToolbar";
import DeleteDialog from "../components/dialogs/DeleteDialog";
import {outputColumns} from "../utils/columns/output";
import OutputDialog from "../components/dialogs/OutputDialogs";
import {useMessage} from "../hooks/useMessage";

const Outputs = () => {

    const resourceName = "Output"

    const [searchParams, setSearchParams] = useSearchParams()

    const paginationModel = {
        page: Number(searchParams.get("page")) || 0,
        pageSize: Number(searchParams.get("pageSize")) || pageSizeOptions[0]
    }

    const { message, onError, onCreateSuccess, onUpdateSuccess, onDeleteSuccess, clearMessage } = useMessage()
    const [loading, setLoading] = useState(false)
    const [outputs, setOutputs] = useState([])
    const [rowCount, setRowCount] = useState(0)
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const [rowSelectionModel, setRowSelectionModel] = useState([])
    const [output, setOutput] = useState(null)

    const [warehouse, setWarehouse] = useState(null)
    const [client, setClient] = useState(null)
    const [currency, setCurrency] = useState(null)

    const getOutputs = useCallback(async () => {
        setLoading(true)
        try {
            const params = {page: paginationModel.page, size: paginationModel.pageSize}
            const { data } = await fetchOutputs(params)
            setOutputs(data.data.content)
            setRowCount(data.data.totalElements)
        } catch (e) {
            onError(e)
        }
        setLoading(false)
    }, [paginationModel.page, paginationModel.pageSize, onError])

    const handleCreateSubmit = async (data, { resetForm }) => {
        setLoading(true)
        try {
            const res = await saveOutput(data)
            if (res.status === 201) {
                await getOutputs()
                resetForm()
                setWarehouse(null)
                setClient(null)
                setCurrency(null)
                onCreateSuccess(res.status, resourceName)
            }
        } catch (e) {
            onError(e)
        }
        toggleAddDialog()
        setLoading(false)
    }
    const handleEditSubmit = async (data, { resetForm }) => {
        setLoading(true)
        try {
            const res = await updateOutput(output?.id, data)
            if (res.status === 200) {
                await getOutputs()
                resetForm()
                setRowSelectionModel([])
                setOutput(null)
                onUpdateSuccess(res.status, resourceName)
            }
        } catch (e) {
            onError(e)
        }
        closeEditDialog()
        setLoading(false)
    }
    const handleDeleteClick = async () => {
        setLoading(true)
        try {
            const res = await deleteOutput(output?.id)
            if (res.status === 202) {
                await getOutputs()
                setRowSelectionModel([])
                setOutput(null)
                onDeleteSuccess(res.status, resourceName)
            }
        } catch (e) {
            onError(e)
        }
        closeDeleteDialog()
        setLoading(false)
    }

    const handleRowSelectionModelChange = (r) => {
        setRowSelectionModel(i => {
            if (i[0] === r[0]) {
                setOutput(null)
                setWarehouse(null)
                setClient(null)
                setCurrency(null)
                return []
            }
            const output = outputs.find(w => w.id === r[0])
            setOutput(output || null)
            setWarehouse(output?.warehouse || null)
            setClient(output?.client || null)
            setCurrency(output?.currency || null)
            return r
        })
    }
    const toggleAddDialog = () => {
        setAddDialogOpen(addDialogOpen => !addDialogOpen)
    }
    const openEditDialog = () => {
        setEditDialogOpen(true)
        setWarehouse(output.warehouse)
        setClient(output.client)
        setCurrency(output.currency)
    }
    const closeEditDialog = () => {
        setEditDialogOpen(false)
        setWarehouse(null)
        setClient(null)
        setCurrency(null)
    }
    const openDeleteDialog = () => {
        setDeleteDialogOpen(true)
    }
    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false)
        setWarehouse(null)
        setClient(null)
        setCurrency(null)
    }

    const handlePaginationModelChange = (paginationModel) => {
        setSearchParams(paginationModel)
    }

    useEffect(() => {
        getOutputs()
    }, [getOutputs])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={"h4"} color={"primary"} marginTop>Outputs</Typography>
            </Grid>
            <Grid item xs={12}>
                <MainAlert
                    message={message}
                    onClose={clearMessage}
                />
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <DataGrid
                        autoHeight
                        disableColumnMenu
                        loading={loading}
                        columns={outputColumns}
                        rows={outputs}
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
                                disabledAddButton: Boolean(message.error),
                                disabled: !Boolean(output),
                                onAddButtonClick: toggleAddDialog,
                                onEditButtonClick: openEditDialog,
                                onDeleteButtonClick: openDeleteDialog
                            }
                        }}
                        hideFooter={loading || Boolean(message.error)}
                    />
                </Paper>
            </Grid>
            <OutputDialog
                title={"Add Output"}
                open={addDialogOpen}
                onClose={toggleAddDialog}
                initialValues={{
                    warehouseId: null,
                    clientId: null,
                    currencyId: null,
                    factureNumber : "",
                    date: null
                }}
                onSubmit={handleCreateSubmit}
                loading={loading}
                warehouse={warehouse}
                setWarehouse={setWarehouse}
                client={client}
                setClient={setClient}
                currency={currency}
                setCurrency={setCurrency}
            />
            <OutputDialog
                title={"Edit Output"}
                open={editDialogOpen}
                onClose={closeEditDialog}
                initialValues={{
                    warehouseId: output?.warehouse?.id || null,
                    clientId: output?.client?.id || null,
                    currencyId: output?.currency?.id || null,
                    factureNumber : output?.factureNumber || "",
                    date: output?.date || null
                }}
                onSubmit={handleEditSubmit}
                loading={loading}
                warehouse={warehouse}
                setWarehouse={setWarehouse}
                client={client}
                setClient={setClient}
                currency={currency}
                setCurrency={setCurrency}
            />
            <DeleteDialog
                title={"Delete Output"}
                open={deleteDialogOpen}
                onClose={closeDeleteDialog}
                resourceName={output?.code || ""}
                onDeleteClick={handleDeleteClick}
                loading={loading}
            />
        </Grid>
    )
}

export default Outputs