import {useSearchParams} from "react-router-dom";
import {pageSizeOptions} from "../utils/constants";
import {useCallback, useEffect, useState} from "react";
import {deleteClient, fetchClients, saveClient, updateClient} from "../api";
import {Grid, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import MainAlert from "../components/alerts/MainAlert";
import {DataGrid} from "@mui/x-data-grid";
import MainGridToolbar from "../components/data-grid/MainGridToolbar";
import SupplierClientDialog from "../components/dialogs/SupplierClientDialog";
import DeleteDialog from "../components/dialogs/DeleteDialog";
import {supplierClientColumns} from "../utils/columns/supplierClient";
import {useMessage} from "../hooks/useMessage";

const Clients = () => {

    const resourceName = "Client"

    const [searchParams, setSearchParams] = useSearchParams()

    const paginationModel = {
        page: Number(searchParams.get("page")) || 0,
        pageSize: Number(searchParams.get("pageSize")) || pageSizeOptions[0]
    }

    const { message, onError, onCreateSuccess, onUpdateSuccess, onDeleteSuccess, clearMessage } = useMessage()
    const [loading, setLoading] = useState(false)
    const [clients, setClients] = useState([])
    const [rowCount, setRowCount] = useState(0)
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const [rowSelectionModel, setRowSelectionModel] = useState([])
    const [client, setClient] = useState(null)

    const getClients = useCallback(async () => {
        setLoading(true)
        try {
            const params = {page: paginationModel.page, size: paginationModel.pageSize}
            const { data } = await fetchClients(params)
            setClients(data.data.content)
            setRowCount(data.data.totalElements)
        } catch (e) {
            onError(e)
        }
        setLoading(false)
    }, [paginationModel.page, paginationModel.pageSize, onError])

    const handleCreateSubmit = async (data, { resetForm }) => {
        setLoading(true)
        try {
            const res = await saveClient(data)
            if (res.status === 201) {
                await getClients()
                resetForm()
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
            const res = await updateClient(client?.id, data)
            if (res.status === 200) {
                await getClients()
                resetForm()
                setRowSelectionModel([])
                setClient(null)
                onUpdateSuccess(res.status, resourceName)
            }
        } catch (e) {
            onError(e)
        }
        toggleEditDialog()
        setLoading(false)
    }
    const handleDeleteClick = async () => {
        setLoading(true)
        try {
            const res = await deleteClient(client?.id)
            if (res.status === 202) {
                await getClients()
                setRowSelectionModel([])
                setClient(null)
                onDeleteSuccess(res.status, resourceName)
            }
        } catch (e) {
            onError(e)
        }
        toggleDeleteDialog()
        setLoading(false)
    }

    const handleRowSelectionModelChange = (r) => {
        setRowSelectionModel(i => {
            if (i[0] === r[0]) {
                setClient(null)
                return []
            }
            const client = clients.find(s => s.id === r[0])
            setClient(client || null)
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
        getClients()
    }, [getClients])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={"h4"} color={"primary"} marginTop>Clients</Typography>
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
                        columns={supplierClientColumns}
                        rows={clients}
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
                                disabled: !Boolean(client),
                                onAddButtonClick: toggleAddDialog,
                                onEditButtonClick: toggleEditDialog,
                                onDeleteButtonClick: toggleDeleteDialog
                            }
                        }}
                    />
                </Paper>
            </Grid>
            <SupplierClientDialog
                title={"Add Client"}
                open={addDialogOpen}
                onClose={toggleAddDialog}
                initialValues={{ name: "", active: true, phoneNumber: "" }}
                onSubmit={handleCreateSubmit}
                loading={loading}
            />
            <SupplierClientDialog
                title={"Edit Client"}
                open={editDialogOpen}
                onClose={toggleEditDialog}
                initialValues={{ name: client?.name || "", active: client?.active || false, phoneNumber: client?.phoneNumber || "" }}
                onSubmit={handleEditSubmit}
                loading={loading}
            />
            <DeleteDialog
                title={"Delete Client"}
                open={deleteDialogOpen}
                onClose={toggleDeleteDialog}
                resourceName={client?.name || ""}
                onDeleteClick={handleDeleteClick}
                loading={loading}
            />
        </Grid>
    )
}

export default Clients