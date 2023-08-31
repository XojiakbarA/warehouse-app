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

const Users = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const paginationModel = {
        page: Number(searchParams.get("page")) || 0,
        pageSize: Number(searchParams.get("pageSize")) || pageSizeOptions[0]
    }
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
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
            console.log(e)
            setError(e.response?.data?.message)
        }
        setLoading(false)
    }, [paginationModel.page, paginationModel.pageSize])

    const handleCreateSubmit = async (data, { resetForm }) => {
        setLoading(true)
        try {
            const res = await saveUser(data)
            if (res.status === 201) {
                await getUsers()
                toggleAddDialog()
                resetForm()
                setWarehouses([])
                setSuccess("User created successfully")
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
            const res = await updateUser(user?.id, data)
            if (res.status === 200) {
                await getUsers()
                toggleEditDialog()
                resetForm()
                setRowSelectionModel([])
                setUser(null)
                setWarehouses([])
                setSuccess("User updated successfully")
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
            const res = await deleteUser(user?.id)
            if (res.status === 202) {
                await getUsers()
                toggleDeleteDialog()
                setRowSelectionModel([])
                setUser(null)
                setWarehouses([])
                setSuccess("User deleted successfully")
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
        getUsers()
    }, [getUsers])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={"h4"} color={"primary"} marginTop>Users</Typography>
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
                                disabledAddButton: Boolean(error),
                                disabled: !Boolean(user),
                                onAddButtonClick: toggleAddDialog,
                                onEditButtonClick: toggleEditDialog,
                                onDeleteButtonClick: toggleDeleteDialog
                            }
                        }}
                        hideFooter={loading || Boolean(error)}
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
                onClose={toggleEditDialog}
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
                onClose={toggleDeleteDialog}
                resourceName={user?.firstName || ""}
                onDeleteClick={handleDeleteClick}
                loading={loading}
            />
        </Grid>
    )
}

export default Users