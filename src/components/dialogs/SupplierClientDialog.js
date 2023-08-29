import {
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel, FormHelperText, Input, InputLabel,
    Stack,
    TextField
} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {useFormik} from "formik";
import {supplierClientValidationSchema} from "../../utils/validate";
import MainIMaskInput from "../inputs/MainIMaskInput";

const SupplierClientDialog = ({ title, open, onClose, initialValues, onSubmit, loading }) => {

    const {handleSubmit, getFieldProps, touched, errors, values, handleChange, handleBlur} = useFormik({
        initialValues,
        validationSchema: supplierClientValidationSchema,
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
                        <FormControl variant="standard">
                            <InputLabel
                                htmlFor="phone-number"
                                error={touched.phoneNumber && Boolean(errors.phoneNumber)}>Phone Number</InputLabel>
                            <Input
                                disabled={loading}
                                id={"phone-number"}
                                { ...getFieldProps('phoneNumber') }
                                inputComponent={MainIMaskInput}
                                error={ touched.phoneNumber && Boolean(errors.phoneNumber) }
                            />
                            <FormHelperText error={touched.phoneNumber && Boolean(errors.phoneNumber)}>{touched.phoneNumber && errors.phoneNumber}</FormHelperText>
                        </FormControl>
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

export default SupplierClientDialog