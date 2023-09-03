import {useSearchParams} from "react-router-dom";
import {pageSizeOptions} from "../utils/constants";
import {useCallback, useEffect, useState} from "react";
import {deleteUser, fetchUsers, saveUser, updateUser} from "../api";
import {Grid, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import MainAlert from "../components/alerts/MainAlert";
import {DataGrid} from "@mui/x-data-grid";
import MainGridToolbar from "../components/data-grid/MainGridToolbar";
import DeleteDialog from "../components/dialogs/DeleteDialog";
import UserDialog from "../components/dialogs/UserDialog";
import {userColumns} from "../utils/columns/user";
import {useMessage} from "../hooks/useMessage";

const Users = () => {

    const resourceName = "User"

    const [searchParams, setSearchParams] = useSearchParams()

    const paginationModel = {
        page: Number(searchParams.get("page")) || 0,
        pageSize: Number(searchParams.get("pageSize")) || pageSizeOptions[0]
    }

    const { message, onError, onCreateSuccess, onUpdateSuccess, onDeleteSuccess, clearMessage } = useMessage()
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [rowCount, setRowCount] = useState(0)
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const [rowSelectionModel, setRowSelectionModel] = useState([])
    const [user, setUser] = useState(null)

    const [warehouses, setWarehouses] = useState([])

    const getUsers = useCallback(async () => {
        setLoading(true)
        try {
            const params = {page: paginationModel.page, size: paginationModel.pageSize}
            const { data } = await fetchUsers(params)
            setUsers(data.data.content)
            setRowCount(data.data.totalElements)
        } catch (e) {
            onError(e)
        }
        setLoading(false)
    }, [paginationModel.page, paginationModel.pageSize, onError])

    const handleCreateSubmit = async (data, { resetForm }) => {
        setLoading(true)
        try {
            const res = await saveUser(data)
            if (res.status === 201) {
                await getUsers()
                resetForm()
                setWarehouses([])
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
            const res = await updateUser(user?.id, data)
            if (res.status === 200) {
                await getUsers()
                resetForm()
                setRowSelectionModel([])
                setUser(null)
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
            const res = await deleteUser(user?.id)
            if (res.status === 202) {
                await getUsers()
                setRowSelectionModel([])
                setUser(null)
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
                setUser(null)
                setWarehouses([])
                return []
            }
            const user = users.find(w => w.id === r[0])
            setUser(user || null)
            setWarehouses(user?.warehouses || [])
            return r
        })
    }
    const toggleAddDialog = () => {
        setAddDialogOpen(addDialogOpen => !addDialogOpen)
    }
    const openEditDialog = () => {
        setEditDialogOpen(true)
        setWarehouses(user.warehouses)
    }
    const closeEditDialog = () => {
        setEditDialogOpen(false)
        setWarehouses([])
    }
    const openDeleteDialog = () => {
        setDeleteDialogOpen(true)
    }
    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false)
        setWarehouses([])
    }

    const handlePaginationModelChange = (paginationModel) => {
        setSearchParams(paginationModel)
    }

    useEffect(() => {
        getUsers()
    }, [getUsers])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={"h4"} color={"primary"} marginTop>Users</Typography>
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
                        columns={userColumns}
                        rows={users}
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
                                disabled: !Boolean(user),
                                onAddButtonClick: toggleAddDialog,
                                onEditButtonClick: openEditDialog,
                                onDeleteButtonClick: openDeleteDialog
                            }
                        }}
                    />
                </Paper>
            </Grid>
            <UserDialog
                create
                title={"Add User"}
                open={addDialogOpen}
                onClose={toggleAddDialog}
                initialValues={{
                    firstName: "",
                    lastName: "",
                    phoneNumber: "",
                    password: "",
                    active: true,
                    warehouseIds: null
                }}
                onSubmit={handleCreateSubmit}
                loading={loading}
                warehouses={warehouses}
                setWarehouses={setWarehouses}
            />
            <UserDialog
                title={"Edit User"}
                open={editDialogOpen}
                onClose={closeEditDialog}
                initialValues={{
                    firstName: user?.firstName || "",
                    lastName: user?.lastName || "",
                    phoneNumber: user?.phoneNumber || "",
                    active: user?.active || true,
                    warehouseIds: user?.warehouses.map(w => w.id) || []
                }}
                onSubmit={handleEditSubmit}
                loading={loading}
                warehouses={warehouses}
                setWarehouses={setWarehouses}
            />
            <DeleteDialog
                title={"Delete User"}
                open={deleteDialogOpen}
                onClose={closeDeleteDialog}
                resourceName={user?.firstName || ""}
                onDeleteClick={handleDeleteClick}
                loading={loading}
            />
        </Grid>
    )
}

export default Users