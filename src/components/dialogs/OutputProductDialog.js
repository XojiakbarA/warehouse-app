import {Button, Dialog, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {useFormik} from "formik";
import {outputProductValidationSchema} from "../../utils/validate";
import {searchInputProductsByProductName} from "../../api";
import MainDebouncedAutocomplete from "../inputs/MainDebouncedAutocomplete";

const OutputProductDialog = ({
                                title, open, onClose, initialValues, onSubmit, loading,
                                inputProduct, setInputProduct
                            }) => {

    const {handleSubmit, getFieldProps, touched,
        errors, setFieldValue
    } = useFormik({
        initialValues,
        validationSchema: () => outputProductValidationSchema(inputProduct?.remaining),
        enableReinitialize: true,
        onSubmit
    })

    const handleProductChange = (e, v) => {
        if (v === null) {
            setInputProduct(null)
            setFieldValue("inputProductId", null)
        } else {
            setInputProduct(v)
            setFieldValue("inputProductId", v.id)
        }
    }

    return (
        <Dialog open={open} onClose={loading ? null : onClose} maxWidth={"xs"} fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <MainDebouncedAutocomplete
                            label={"Input Product"}
                            promise={searchInputProductsByProductName}
                            onChange={handleProductChange}
                            value={inputProduct}
                            loading={loading}
                            getOptionDisabled={o => o.remaining === 0}
                            getOptionLabel={o => o.id + " " + o.product.name + " " + new Date(o.expireDate).toLocaleString()}
                            error={ touched.inputProductId && Boolean(errors.inputProductId) }
                            helperText={ touched.inputProductId && errors.inputProductId }
                        />
                        <TextField
                            disabled={loading}
                            label="Amount"
                            type="number"
                            fullWidth
                            variant="standard"
                            error={ touched.amount && Boolean(errors.amount) }
                            helperText={ touched.amount && errors.amount }
                            { ...getFieldProps('amount') }
                        />
                        <TextField
                            disabled={loading}
                            label="Price"
                            type="number"
                            fullWidth
                            variant="standard"
                            error={ touched.price && Boolean(errors.price) }
                            helperText={ touched.price && errors.price }
                            { ...getFieldProps('price') }
                        />
                        <Stack direction={"row"} spacing={2}>
                            <Button onClick={onClose} disabled={loading}>Cancel</Button>
                            <LoadingButton type="submit" loading={loading}>Save</LoadingButton>
                        </Stack>
                    </Stack>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default OutputProductDialog