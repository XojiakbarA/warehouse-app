import {Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, Stack} from "@mui/material";
import {useFormik} from "formik";
import {currencyValidationSchema} from "../../utils/validate";
import MainAutocomplete from "../inputs/MainAutocomplete";
import {useState} from "react";
import {fetchAvailableCurrencies} from "../../api";
import {LoadingButton} from "@mui/lab";

const CurrencyDialog = ({ open, title, loading, onClose, onSubmit, currency, setCurrency }) => {

    const { handleSubmit, handleChange, handleBlur,
        values, setFieldValue } = useFormik({
        initialValues: {
            active: true,
            currencyCode: ""
        },
        validationSchema: currencyValidationSchema,
        enableReinitialize: true,
        onSubmit
    })

    const handleParentCategoryChange = (e, v) => {
        if (v === null) {
            setCurrency(null)
            setFieldValue("currencyCode", null)
        } else {
            setCurrency(v)
            setFieldValue("currencyCode", v.currencyCode)
        }
    }

    return(
        <Dialog open={open} onClose={loading ? null : onClose} maxWidth={"xs"} fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <FormControlLabel
                            disabled={loading}
                            label="Active"
                            labelPlacement="end"
                            name={"active"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            control={<Checkbox checked={values.active}/>}
                        />
                        <MainAutocomplete
                            label={"Currency"}
                            promise={fetchAvailableCurrencies}
                            onChange={handleParentCategoryChange}
                            value={currency}
                            loading={loading}
                            getOptionLabel={ (option) => option.currencyCode + " (" + option.currencyName + ")" }
                            isOptionEqualToValue={ (o, v) => o.currencyCode === v.currencyCode }
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

export default CurrencyDialog