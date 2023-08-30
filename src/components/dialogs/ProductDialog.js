import {
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Stack,
    TextField
} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {useFormik} from "formik";
import {productValidationSchema} from "../../utils/validate";
import {fetchMeasurements, searchCategoriesByName} from "../../api";
import MainAutocomplete from "../inputs/MainAutocomplete";
import MainDebouncedAutocomplete from "../inputs/MainDebouncedAutocomplete";
import ImageUpload from "../inputs/ImageUpload";
import {useSinglePreview} from "../../hooks/useSinglePreview";


const ProductDialog = ({
    title, open, onClose, initialValues, onSubmit, loading,
    setCategory, category, setMeasurement, measurement
}) => {

    const {handleSubmit, getFieldProps, touched, errors,
        values, handleChange, handleBlur,
        setFieldValue, setValues, setTouched
    } = useFormik({
        initialValues,
        validationSchema: productValidationSchema,
        enableReinitialize: true,
        onSubmit
    })

    const { preview, handleUploadChange, handlePreviewDeleteClick } = useSinglePreview(setValues, setTouched)

    const handleCategoryChange = (e, v) => {
        if (v === null) {
            setCategory(null)
            setFieldValue("categoryId", null)
        } else {
            setCategory(v)
            setFieldValue("categoryId", v.id)
        }
    }
    const handleMeasurementChange = (e, v) => {
        if (v === null) {
            setMeasurement(null)
            setFieldValue("measurementId", null)
        } else {
            setMeasurement(v)
            setFieldValue("measurementId", v.id)
        }
    }

    return (
        <Dialog open={open} onClose={loading ? null : onClose} maxWidth={"xs"} fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} marginTop={2}>
                        <ImageUpload
                            handlePreviewDeleteClick={handlePreviewDeleteClick}
                            handleUploadChange={handleUploadChange}
                            // handleDeleteImage={toggleDeleteCollectionImageDialog}
                            name={"photo"}
                            preview={preview}
                            // src={collection?.image?.value}
                            width={"100%"}
                            height={200}
                            error={ Boolean(errors.image) }
                            helperText={ errors.image }
                        />
                        <TextField
                            disabled={loading}
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            error={ touched.name && Boolean(errors.name) }
                            helperText={ touched.name && errors.name }
                            { ...getFieldProps('name') }
                        />
                        <FormControlLabel
                            disabled={loading}
                            label="Active"
                            labelPlacement="end"
                            name={"active"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            control={<Checkbox checked={values.active}/>}
                        />
                        <MainDebouncedAutocomplete
                            label={"Category"}
                            promise={searchCategoriesByName}
                            onChange={handleCategoryChange}
                            value={category}
                            loading={loading}
                            error={ touched.categoryId && Boolean(errors.categoryId) }
                            helperText={ touched.categoryId && errors.categoryId }
                        />
                        <MainAutocomplete
                            label={"Measurement"}
                            promise={fetchMeasurements}
                            onChange={handleMeasurementChange}
                            value={measurement}
                            loading={loading}
                            error={ touched.measurementId && Boolean(errors.measurementId) }
                            helperText={ touched.measurementId && errors.measurementId }
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

export default ProductDialog