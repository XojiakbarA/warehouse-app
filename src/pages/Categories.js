import {Grid, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useCallback, useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import MainGridToolbar from "../components/data-grid/MainGridToolbar";
import {pageSizeOptions} from "../utils/constants";
import {useSearchParams} from "react-router-dom";
import {deleteCategory, fetchCategories, saveCategory, updateCategory} from "../api";
import DeleteDialog from "../components/dialogs/DeleteDialog";
import CategoryDialog from "../components/dialogs/CategoryDialog";
import MainAlert from "../components/alerts/MainAlert";
import {categoryColumns} from "../utils/columns/category";
import {useMessage} from "../hooks/useMessage";

const Categories = () => {

    const resourceName = "Category"

    const [searchParams, setSearchParams] = useSearchParams()

    const paginationModel = {
        page: Number(searchParams.get("page")) || 0,
        pageSize: Number(searchParams.get("pageSize")) || pageSizeOptions[0]
    }

    const { message, onError, onCreateSuccess, onUpdateSuccess, onDeleteSuccess, clearMessage } = useMessage()
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [rowCount, setRowCount] = useState(0)
    const [rowSelectionModel, setRowSelectionModel] = useState([])

    const [category, setCategory] = useState(null)

    const [parentCategory, setParentCategory] = useState(null)

    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const getCategories = useCallback(async () => {
        setLoading(true)
        try {
            const params = {page: paginationModel.page, size: paginationModel.pageSize}
            const { data } = await fetchCategories(params)
            setCategories(data.data.content)
            setRowCount(data.data.totalElements)
        } catch (e) {
            onError(e)
        }
        setLoading(false)
    }, [paginationModel.page, paginationModel.pageSize, onError])

    const handleCreateSubmit = async (data, { resetForm }) => {
        setLoading(true)
        try {
            const res = await saveCategory(data)
            if (res.status === 201) {
                await getCategories()
                resetForm()
                setParentCategory(null)
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
            const res = await updateCategory(category?.id, data)
            if (res.status === 200) {
                await getCategories()
                closeEditDialog()
                resetForm()
                setRowSelectionModel([])
                setCategory(null)
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
            const res = await deleteCategory(category?.id)
            if (res.status === 202) {
                await getCategories()
                setRowSelectionModel([])
                setCategory(null)
                onDeleteSuccess(res.status, resourceName)
            }
        } catch (e) {
            onError(e)
        }
        closeDeleteDialog()
        setLoading(false)
    }

    const toggleAddDialog = () => {
        setAddDialogOpen(addDialogOpen => !addDialogOpen)
    }
    const openEditDialog = () => {
        setEditDialogOpen(true)
        setParentCategory(category.parentCategory)
    }
    const closeEditDialog = () => {
        setEditDialogOpen(false)
        setParentCategory(null)
    }
    const openDeleteDialog = () => {
        setDeleteDialogOpen(true)
    }
    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false)
        setParentCategory(null)
    }

    const handleRowSelectionModelChange = (r) => {
        setRowSelectionModel(i => {
            if (i[0] === r[0]) {
                setCategory(null)
                setParentCategory(null)
                return []
            }
            const category = categories.find(c => c.id === r[0])
            setCategory(category || null)
            setParentCategory(category?.parentCategory || null)
            return r
        })
    }
    const handlePaginationModelChange = (paginationModel) => {
        setSearchParams(paginationModel)
    }

    useEffect(() => {
        getCategories()
    }, [getCategories])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={"h4"} color={"primary"} marginTop>Categories</Typography>
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
                        columns={categoryColumns}
                        rows={categories}
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
                                disabled: !Boolean(category),
                                onAddButtonClick: toggleAddDialog,
                                onEditButtonClick: openEditDialog,
                                onDeleteButtonClick: openDeleteDialog
                            }
                        }}
                        hideFooter={loading || Boolean(message.error)}
                    />
                </Paper>
            </Grid>
            <CategoryDialog
                title={"Add Category"}
                open={addDialogOpen}
                onClose={toggleAddDialog}
                initialValues={{
                    name: "",
                    active: true,
                    parentCategoryId: null
                }}
                onSubmit={handleCreateSubmit}
                loading={loading}
                parentCategory={parentCategory}
                setParentCategory={setParentCategory}
            />
            <CategoryDialog
                title={"Edit Category"}
                open={editDialogOpen}
                onClose={closeEditDialog}
                initialValues={{
                    name: category?.name || "",
                    active: category?.active || false,
                    parentCategoryId: category?.parentCategory?.id || null
                }}
                onSubmit={handleEditSubmit}
                loading={loading}
                parentCategory={parentCategory}
                setParentCategory={setParentCategory}
            />
            <DeleteDialog
                title={"Delete Category"}
                open={deleteDialogOpen}
                onClose={closeDeleteDialog}
                resourceName={category?.name || ""}
                onDeleteClick={handleDeleteClick}
                loading={loading}
            />
        </Grid>
    )
}

export default Categories