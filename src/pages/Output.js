import {Grid, Paper, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import MainAlert from "../components/alerts/MainAlert";
import {useCallback, useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {pageSizeOptions} from "../utils/constants";
import MainGridToolbar from "../components/data-grid/MainGridToolbar";
import {useSearchParams} from "react-router-dom";
import {deleteOutputProduct, fetchOutputProducts, saveOutputProduct, updateOutputProduct} from "../api";
import {useParams} from "react-router";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from "@mui/material/Collapse";
import DeleteDialog from "../components/dialogs/DeleteDialog";
import InputProductDialog from "../components/dialogs/InputProductDialog";
import OutputInfo from "../components/cards/OutputInfo";
import {outputProductColumns} from "../utils/columns/outputProduct";
import OutputProductDialog from "../components/dialogs/OutputProductDialog";

const Output = () => {

    const { id } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()

    const paginationModel = {
        page: Number(searchParams.get("page")) || 0,
        pageSize: Number(searchParams.get("pageSize")) || pageSizeOptions[0]
    }
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)
    const [outputProducts, setOutputProducts] = useState([])
    const [rowCount, setRowCount] = useState(0)
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const [rowSelectionModel, setRowSelectionModel] = useState([])
    const [outputProduct, setOutputProduct] = useState(null)
    const [product, setProduct] = useState(null)

    const [collapse, setCollapse] = useState(true)

    const getOutputProducts = useCallback(async () => {
        setLoading(true)
        try {
            const params = {page: paginationModel.page, size: paginationModel.pageSize}
            const { data } = await fetchOutputProducts(id, params)
            setOutputProducts(data.data.content)
            setRowCount(data.data.totalElements)
        } catch (e) {
            console.log(e)
            setError(e.response?.data?.message)
        }
        setLoading(false)
    }, [paginationModel.page, paginationModel.pageSize, id])

    const handleCreateSubmit = async (data, { resetForm }) => {
        setLoading(true)
        try {
            const res = await saveOutputProduct(data)
            if (res.status === 201) {
                await getOutputProducts()
                toggleAddDialog()
                resetForm()
                setSuccess("Output Product created successfully")
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
            const res = await updateOutputProduct(outputProduct?.id, data)
            if (res.status === 200) {
                await getOutputProducts()
                toggleEditDialog()
                resetForm()
                setRowSelectionModel([])
                setOutputProduct(null)
                setProduct(null)
                setSuccess("Output Product updated successfully")
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
            const res = await deleteOutputProduct(outputProduct?.id)
            if (res.status === 202) {
                await getOutputProducts()
                toggleDeleteDialog()
                setRowSelectionModel([])
                setOutputProduct(null)
                setProduct(null)
                setSuccess("Output Product deleted successfully")
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
                setOutputProduct(null)
                setProduct(null)
                return []
            }
            const outputProduct = outputProducts.find(w => w.id === r[0])
            setOutputProduct(outputProduct || null)
            setProduct(outputProduct?.product || null)
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
        getOutputProducts()
    }, [getOutputProducts])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Stack direction={"row"} spacing={4} alignItems={"center"}>
                    <Typography variant={"h4"} color={"primary"} marginTop>Output</Typography>
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
                    <OutputInfo/>
                </Collapse>
            </Grid>
            <Grid item xs={12}>
                <Typography variant={"h4"} color={"primary"} marginTop>Output Products</Typography>
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
                        columns={outputProductColumns}
                        rows={outputProducts}
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
                                disabled: !Boolean(outputProduct),
                                onAddButtonClick: toggleAddDialog,
                                onEditButtonClick: toggleEditDialog,
                                onDeleteButtonClick: toggleDeleteDialog
                            }
                        }}
                        hideFooter={loading || Boolean(error)}
                    />
                </Paper>
            </Grid>
            <OutputProductDialog
                title={"Add Output Product"}
                open={addDialogOpen}
                onClose={toggleAddDialog}
                initialValues={{
                    productId: null,
                    amount: "",
                    price: "",
                    outputId: id
                }}
                onSubmit={handleCreateSubmit}
                loading={loading}
                product={product}
                setProduct={setProduct}
            />
            <OutputProductDialog
                title={"Edit Output Product"}
                open={editDialogOpen}
                onClose={toggleEditDialog}
                initialValues={{
                    productId: outputProduct?.product?.id || null,
                    amount: outputProduct?.amount || "",
                    price: outputProduct?.price || "",
                    outputId: outputProduct?.output?.id || null
                }}
                onSubmit={handleEditSubmit}
                loading={loading}
                product={product}
                setProduct={setProduct}
            />
            <DeleteDialog
                title={"Delete Output Product"}
                open={deleteDialogOpen}
                onClose={toggleDeleteDialog}
                resourceName={outputProduct?.product?.name || ""}
                onDeleteClick={handleDeleteClick}
                loading={loading}
            />
        </Grid>
    )
}

export default Output