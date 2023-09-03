import {Grid, Paper, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import MainAlert from "../components/alerts/MainAlert";
import {useCallback, useEffect, useState} from "react";
import InputInfo from "../components/cards/InputInfo";
import {DataGrid} from "@mui/x-data-grid";
import {pageSizeOptions} from "../utils/constants";
import MainGridToolbar from "../components/data-grid/MainGridToolbar";
import {useSearchParams} from "react-router-dom";
import {deleteInputProduct, fetchInputProducts, saveInputProduct, updateInputProduct} from "../api";
import {useParams} from "react-router";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from "@mui/material/Collapse";
import {inputProductColumns} from "../utils/columns/inputProduct";
import DeleteDialog from "../components/dialogs/DeleteDialog";
import InputProductDialog from "../components/dialogs/InputProductDialog";
import {useMessage} from "../hooks/useMessage";

const Input = () => {

    const resourceName = "Input Product"

    const { id } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()

    const paginationModel = {
        page: Number(searchParams.get("page")) || 0,
        pageSize: Number(searchParams.get("pageSize")) || pageSizeOptions[0]
    }

    const { message, onError, onCreateSuccess, onUpdateSuccess, onDeleteSuccess, clearMessage } = useMessage()
    const [loading, setLoading] = useState(false)
    const [inputProducts, setInputProducts] = useState([])
    const [rowCount, setRowCount] = useState(0)
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const [rowSelectionModel, setRowSelectionModel] = useState([])
    const [inputProduct, setInputProduct] = useState(null)
    const [product, setProduct] = useState(null)

    const [collapse, setCollapse] = useState(true)

    const getInputProducts = useCallback(async () => {
        setLoading(true)
        try {
            const params = {page: paginationModel.page, size: paginationModel.pageSize}
            const { data } = await fetchInputProducts(id, params)
            setInputProducts(data.data.content)
            setRowCount(data.data.totalElements)
        } catch (e) {
            onError(e)
        }
        setLoading(false)
    }, [paginationModel.page, paginationModel.pageSize, id, onError])

    const handleCreateSubmit = async (data, { resetForm }) => {
        setLoading(true)
        try {
            const res = await saveInputProduct(data)
            if (res.status === 201) {
                await getInputProducts()
                resetForm()
                setProduct(null)
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
            const res = await updateInputProduct(inputProduct?.id, data)
            if (res.status === 200) {
                await getInputProducts()
                resetForm()
                setRowSelectionModel([])
                setInputProduct(null)
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
            const res = await deleteInputProduct(inputProduct?.id)
            if (res.status === 202) {
                await getInputProducts()
                setRowSelectionModel([])
                setInputProduct(null)
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
                setInputProduct(null)
                setProduct(null)
                return []
            }
            const inputProduct = inputProducts.find(w => w.id === r[0])
            setInputProduct(inputProduct || null)
            setProduct(inputProduct?.product || null)
            return r
        })
    }
    const toggleAddDialog = () => {
        setAddDialogOpen(addDialogOpen => !addDialogOpen)
    }
    const openEditDialog = () => {
        setEditDialogOpen(true)
        setProduct(inputProduct.product)
    }
    const closeEditDialog = () => {
        setEditDialogOpen(false)
        setProduct(null)
    }
    const openDeleteDialog = () => {
        setDeleteDialogOpen(true)
    }
    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false)
        setProduct(null)
    }

    const handlePaginationModelChange = (paginationModel) => {
        setSearchParams(paginationModel)
    }

    useEffect(() => {
        getInputProducts()
    }, [getInputProducts])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Stack direction={"row"} spacing={4} alignItems={"center"}>
                    <Typography variant={"h4"} color={"primary"} marginTop>Input</Typography>
                    <IconButton
                        color={"primary"}
                        onClick={ () => setCollapse(i => !i) }
                    >
                        {
                            collapse
                            ?
                            <KeyboardArrowUpIcon fontSize={"large"} color={"inherit"}/>
                            :
                            <KeyboardArrowDownIcon fontSize={"large"} color={"inherit"}/>
                        }
                    </IconButton>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Collapse in={collapse}>
                    <InputInfo/>
                </Collapse>
            </Grid>
            <Grid item xs={12}>
                <Typography variant={"h4"} color={"primary"} marginTop>Input Products</Typography>
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
                        columns={inputProductColumns}
                        rows={inputProducts}
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
                                disabled: !Boolean(inputProduct),
                                onAddButtonClick: toggleAddDialog,
                                onEditButtonClick: openEditDialog,
                                onDeleteButtonClick: openDeleteDialog
                            }
                        }}
                    />
                </Paper>
            </Grid>
            <InputProductDialog
                title={"Add Input Product"}
                open={addDialogOpen}
                onClose={toggleAddDialog}
                initialValues={{
                    productId: null,
                    amount: "",
                    price: "",
                    expireDate: null,
                    inputId: id
                }}
                onSubmit={handleCreateSubmit}
                loading={loading}
                product={product}
                setProduct={setProduct}
            />
            <InputProductDialog
                title={"Edit Input Product"}
                open={editDialogOpen}
                onClose={openEditDialog}
                initialValues={{
                    productId: inputProduct?.product?.id || null,
                    amount: inputProduct?.amount || "",
                    price: inputProduct?.price || "",
                    expireDate: inputProduct?.expireDate || null,
                    inputId: inputProduct?.input?.id || null
                }}
                onSubmit={handleEditSubmit}
                loading={loading}
                product={product}
                setProduct={setProduct}
            />
            <DeleteDialog
                title={"Delete Input Product"}
                open={deleteDialogOpen}
                onClose={closeDeleteDialog}
                resourceName={inputProduct?.product?.name || ""}
                onDeleteClick={handleDeleteClick}
                loading={loading}
            />
        </Grid>
    )
}

export default Input