import {Button, Dialog, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";
import { useFormik } from "formik";
import {remindBeforeValidationSchema} from "../../utils/validate";
import { LoadingButton } from "@mui/lab";

const RemindBeforeDialog = ({ title, open, onClose, initialValues, onSubmit, loading }) => {

    const {handleSubmit, getFieldProps, touched, errors} = useFormik({
        initialValues,
        validationSchema: remindBeforeValidationSchema,
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
                            label="Days"
                            type="number"
                            fullWidth
                            variant="standard"
                            error={ touched.value && Boolean(errors.value) }
                            helperText={ touched.value && errors.value }
                            { ...getFieldProps('value') }
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

export default RemindBeforeDialog