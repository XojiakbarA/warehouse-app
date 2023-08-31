import {useFormik} from "formik";
import {userCreateValidationSchema, userEditValidationSchema} from "../../utils/validate";
import {
    Button, Checkbox,
    Dialog,
    DialogContent,
    DialogTitle, FormControl, FormControlLabel,
    FormHelperText,
    Input,
    InputLabel,
    Stack,
    TextField
} from "@mui/material";
import MainDebouncedAutocomplete from "../inputs/MainDebouncedAutocomplete";
import {searchWarehousesByName} from "../../api";
import {LoadingButton} from "@mui/lab";
import MainIMaskInput from "../inputs/MainIMaskInput";

const UserDialog = ({
                         title, open, onClose, initialValues, onSubmit, loading,
                         warehouses, setWarehouses, create
                     }) => {

    const {
        handleSubmit, getFieldProps, touched, errors,
        values, setFieldValue, handleChange, handleBlur
    } = useFormik({
        initialValues,
        validationSchema: create ? userCreateValidationSchema : userEditValidationSchema,
        enableReinitialize: true,
        onSubmit
    })

    const handleWarehouseChange = (e, v) => {
        if (v.length === 0) {
            setFieldValue("warehouseIds", v)
        } else {
            const ids = v.map(i => i.id)
            setFieldValue("warehouseIds", ids)
        }
        setWarehouses(v)
    }

    return (
        <Dialog open={open} onClose={loading ? null : onClose} maxWidth={"xs"} fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            disabled={loading}
                            label="First Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            error={ touched.firstName && Boolean(errors.firstName) }
                            helperText={ touched.firstName && errors.firstName }
                            { ...getFieldProps('firstName') }
                        />
                        <TextField
                            disabled={loading}
                            label="Last Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            error={ touched.lastName && Boolean(errors.lastName) }
                            helperText={ touched.lastName && errors.lastName }
                            { ...getFieldProps('lastName') }
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
                        {
                            create
                            &&
                                <TextField
                                    disabled={loading}
                                    label="Password"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    error={ touched.password && Boolean(errors.password) }
                                    helperText={ touched.password && errors.password }
                                    { ...getFieldProps('password') }
                                />
                        }
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
                            multiple
                            getOptionLabel={ option => option instanceof Array ? "" : option.name}
                            label={"Warehouses"}
                            promise={searchWarehousesByName}
                            onChange={handleWarehouseChange}
                            value={warehouses}
                            loading={loading}
                            error={ touched.warehouseIds && Boolean(errors.warehouseIds) }
                            helperText={ touched.warehouseIds && errors.warehouseIds }
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

export default UserDialog