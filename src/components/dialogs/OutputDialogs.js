import {useFormik} from "formik";
import {outputValidationSchema} from "../../utils/validate";
import {Button, Dialog, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";
import MainDebouncedAutocomplete from "../inputs/MainDebouncedAutocomplete";
import {fetchCurrencies, searchClientsByName, searchWarehousesByName} from "../../api";
import {LoadingButton} from "@mui/lab";
import MainAutocomplete from "../inputs/MainAutocomplete";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import en from "date-fns/locale/en-US";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

const OutputDialog = ({
                         title, open, onClose, initialValues, onSubmit, loading,
                         warehouse, setWarehouse, client, setClient,
                         currency, setCurrency
                     }) => {

    const {
        handleSubmit, getFieldProps, touched, errors,
        values, setFieldValue
    } = useFormik({
        initialValues,
        validationSchema: outputValidationSchema,
        enableReinitialize: true,
        onSubmit
    })

    const handleWarehouseChange = (e, v) => {
        if (v === null) {
            setWarehouse(null)
            setFieldValue("warehouseId", null)
        } else {
            setWarehouse(v)
            setFieldValue("warehouseId", v.id)
        }
    }
    const handleClientChange = (e, v) => {
        if (v === null) {
            setClient(null)
            setFieldValue("clientId", null)
        } else {
            setClient(v)
            setFieldValue("clientId", v.id)
        }
    }
    const handleCurrencyChange = (e, v) => {
        if (v === null) {
            setCurrency(null)
            setFieldValue("currencyId", null)
        } else {
            setCurrency(v)
            setFieldValue("currencyId", v.id)
        }
    }

    return (
        <Dialog open={open} onClose={loading ? null : onClose} maxWidth={"xs"} fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <MainDebouncedAutocomplete
                            label={"Warehouse"}
                            promise={searchWarehousesByName}
                            onChange={handleWarehouseChange}
                            value={warehouse}
                            loading={loading}
                            error={ touched.warehouseId && Boolean(errors.warehouseId) }
                            helperText={ touched.warehouseId && errors.warehouseId }
                        />
                        <MainDebouncedAutocomplete
                            label={"Client"}
                            promise={searchClientsByName}
                            onChange={handleClientChange}
                            value={client}
                            loading={loading}
                            error={ touched.clientId && Boolean(errors.clientId) }
                            helperText={ touched.clientId && errors.clientId }
                        />
                        <MainAutocomplete
                            label={"Currency"}
                            promise={fetchCurrencies}
                            onChange={handleCurrencyChange}
                            value={currency}
                            loading={loading}
                            error={ touched.currencyId && Boolean(errors.currencyId) }
                            helperText={ touched.currencyId && errors.currencyId }
                            getOptionLabel={ (option) => option.currencyCode + " (" + option.currencyName + ")" }
                            isOptionEqualToValue={ (o, v) => o.currencyCode === v.currencyCode }
                        />
                        <TextField
                            disabled={loading}
                            label="Facture Number"
                            type="number"
                            fullWidth
                            variant="standard"
                            error={ touched.factureNumber && Boolean(errors.factureNumber) }
                            helperText={ touched.factureNumber && errors.factureNumber }
                            { ...getFieldProps('factureNumber') }
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={en}>
                            <DateTimePicker
                                label="Date"
                                value={values.date ? new Date(values.date) : null}
                                onChange={ (value) => setFieldValue("date", value.getTime()) }
                                slotProps={{
                                    textField: {
                                        disabled: loading,
                                        variant: "standard",
                                        error: touched.date && Boolean(errors.date),
                                        helperText: touched.date && errors.date
                                    }
                                }}
                            />
                        </LocalizationProvider>
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

export default OutputDialog