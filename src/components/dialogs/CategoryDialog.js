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
import {mainValidationSchema} from "../../utils/validate";
import {searchCategoriesByName} from "../../api";
import MainDebouncedAutocomplete from "../inputs/MainDebouncedAutocomplete";

const CategoryDialog = ({ title, open, onClose, initialValues, onSubmit, loading, parentCategory, setParentCategory }) => {

    const {
        handleSubmit,
        getFieldProps, touched, errors, values,
        handleChange, handleBlur, setFieldValue
    } = useFormik({
        initialValues,
        validationSchema: mainValidationSchema,
        enableReinitialize: true,
        onSubmit
    })

    const handleParentCategoryChange = (e, v) => {
        if (v === null) {
            setParentCategory(null)
            setFieldValue("parentCategoryId", null)
        } else {
            setParentCategory(v)
            setFieldValue("parentCategoryId", v.id)
        }
    }

    return (
        <Dialog open={open} onClose={loading ? null : onClose} maxWidth={"xs"} fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
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
                            label={"Parent Category"}
                            promise={searchCategoriesByName}
                            onChange={handleParentCategoryChange}
                            value={parentCategory}
                            loading={loading}
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

export default CategoryDialog