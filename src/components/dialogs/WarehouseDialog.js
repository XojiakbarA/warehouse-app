import {Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, Stack, TextField} from "@mui/material";
import { useFormik } from "formik";
import { warehouseValidationSchema } from "../../utils/validate";
import { LoadingButton } from "@mui/lab";

const WarehouseDialog = ({ title, open, onClose, initialValues, onSubmit, loading }) => {

    const {handleSubmit, getFieldProps, touched, errors, values, handleChange, handleBlur} = useFormik({
        initialValues,
        validationSchema: warehouseValidationSchema,
        enableReinitialize: true,
        onSubmit
    })

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

export default WarehouseDialog