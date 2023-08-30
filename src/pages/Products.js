import {useSearchParams} from "react-router-dom";
import {pageSizeOptions, productColumns} from "../utils/constants";
import {useCallback, useEffect, useState} from "react";
import {deleteProduct, fetchProducts, saveProduct, updateProduct} from "../api";
import {Grid, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import MainAlert from "../components/alerts/MainAlert";
import {DataGrid} from "@mui/x-data-grid";
import MainGridToolbar from "../components/data-grid/MainGridToolbar";
import DeleteDialog from "../components/dialogs/DeleteDialog";
import ProductDialog from "../components/dialogs/ProductDialog";
import {appendToFormData} from "../utils/helper";

const Products = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const paginationModel = {
        page: Number(searchParams.get("page")) || 0,
        pageSize: Number(searchParams.get("pageSize")) || pageSizeOptions[0]
    }
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [rowCount, setRowCount] = useState(0)
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const [rowSelectionModel, setRowSelectionModel] = useState([])
    const [product, setProduct] = useState(null)
    const [category, setCategory] = useState(null)
    const [measurement, setMeasurement] = useState(null)

    const getProducts = useCallback(async () => {
        setLoading(true)
        try {
            const params = {page: paginationModel.page, size: paginationModel.pageSize}
            const { data } = await fetchProducts(params)
            setProducts(data.data.content)
            setRowCount(data.data.totalElements)
        } catch (e) {
            console.log(e)
            if (e.code === "ERR_NETWORK") {
                setError(e.message)
            } else {
                setError(e.response.data.message)
            }
        }
        setLoading(false)
    }, [paginationModel.page, paginationModel.pageSize])

    const handleCreateSubmit = async (data, { resetForm }) => {
        setLoading(true)
        try {
            const formData = appendToFormData(data)
            const res = await saveProduct(formData)
            if (res.status === 201) {
                await getProducts()
                toggleAddDialog()
                resetForm()
                setSuccess("Product created successfully")
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
            const formData = appendToFormData(data)
            const res = await updateProduct(product?.id, formData)
            if (res.status === 200) {
                await getProducts()
                toggleEditDialog()
                resetForm()
                setRowSelectionModel([])
                setSuccess("Product updated successfully")
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
            const res = await deleteProduct(product?.id)
            if (res.status === 202) {
                await getProducts()
                toggleDeleteDialog()
                setRowSelectionModel([])
                setSuccess("Product deleted successfully")
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
                setProduct(null)
                setCategory(null)
                setMeasurement(null)
                return []
            }
            const product = products.find(w => w.id === r[0])
            setProduct(product || null)
            setCategory(product?.category || null)
            setMeasurement(product?.measurement || null)
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
        getProducts()
    }, [getProducts])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={"h4"} color={"primary"} marginTop>Products</Typography>
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
                        columns={productColumns}
                        rows={products}
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
                                disabled: !Boolean(product),
                                onAddButtonClick: toggleAddDialog,
                                onEditButtonClick: toggleEditDialog,
                                onDeleteButtonClick: toggleDeleteDialog
                            }
                        }}
                        hideFooter={loading || Boolean(error)}
                    />
                </Paper>
            </Grid>
            <ProductDialog
                title={"Add Product"}
                open={addDialogOpen}
                onClose={toggleAddDialog}
                initialValues={{
                    name: "",
                    active: true,
                    categoryId: null,
                    code: "",
                    measurementId: null,
                    photo: null
                }}
                onSubmit={handleCreateSubmit}
                loading={loading}
                category={category}
                setCategory={setCategory}
                measurement={measurement}
                setMeasurement={setMeasurement}
            />
            <ProductDialog
                title={"Edit Product"}
                open={editDialogOpen}
                onClose={toggleEditDialog}
                initialValues={{
                    name: product?.name || "",
                    active: product?.active || false,
                    categoryId: product?.category?.id || null,
                    code: product?.code || "",
                    measurementId: product?.measurement?.id || null,
                    photo: null
                }}
                onSubmit={handleEditSubmit}
                loading={loading}
                category={category}
                setCategory={setCategory}
                measurement={measurement}
                setMeasurement={setMeasurement}
            />
            <DeleteDialog
                title={"Delete Product"}
                open={deleteDialogOpen}
                onClose={toggleDeleteDialog}
                resourceName={product?.name || ""}
                onDeleteClick={handleDeleteClick}
                loading={loading}
            />
        </Grid>
    )
}

export default Products