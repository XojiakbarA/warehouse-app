import {Autocomplete, CircularProgress, TextField} from "@mui/material";
import {useCallback, useEffect, useState} from "react";

const MainAutocomplete = ({ label, promise, onChange, value, loading, getOptionLabel, isOptionEqualToValue, error, helperText }) => {

    const [fetchLoading, setFetchLoading] = useState(false)
    const [options, setOptions] = useState([])

    const getOptions = useCallback(async () => {
        setFetchLoading(true)
        try {
            const { data } = await promise()
            setOptions(data.data)
        } catch (e) {
            console.log(e)
        }
        setFetchLoading(false)
    }, [promise])

    useEffect(() => {
        getOptions()
    },[getOptions])

    return (
        <Autocomplete
            loading={fetchLoading}
            disabled={loading || fetchLoading}
            renderInput={ (params) => (
                <TextField
                    variant={"standard"}
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {fetchLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                    error={error}
                    helperText={helperText}
                />
            ) }
            options={options}
            getOptionDisabled={option => !option.active}
            getOptionLabel={getOptionLabel ? getOptionLabel : (option) => option.name}
            isOptionEqualToValue={isOptionEqualToValue ? isOptionEqualToValue : (option, value) => option.id === value.id}
            value={value}
            onChange={onChange}
        />
    )
}

export default MainAutocomplete