import {Autocomplete, CircularProgress, TextField} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {useDebounce} from "../../hooks/useDebounce";

const MainAutocomplete = ({ label, promise, onChange, value, loading }) => {

    const [inputValue, setInputValue] = useState("")
    const [fetchLoading, setFetchLoading] = useState(false)
    const [options, setOptions] = useState([])

    const debounce = useDebounce(inputValue, 700)

    const getOptions = useCallback(async (debounce) => {
        setFetchLoading(true)
        try {
            const { data } = await promise(debounce)
            const options = data.data
            if (value) {
                const isPresent = !!options.find(o => o.id === value.id)
                if (!isPresent) {
                    options.push(value)
                }
            }
            setOptions(options)
        } catch (e) {
            console.log(e)
        }
        setFetchLoading(false)
    }, [promise, value])

    const handleInputChange = (e, v) => {
        setInputValue(v)
    }

    useEffect(() => {
        if (debounce !== "") {
            getOptions(debounce)
        }
    },[getOptions, debounce])

    return (
        <Autocomplete
            loading={fetchLoading}
            disabled={loading}
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
                />
            ) }
            options={options}
            getOptionLabel={ (option) => option.name }
            isOptionEqualToValue={(option, value) => option.id === value.id}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            value={value}
            onChange={onChange}
        />
    )
}

export default MainAutocomplete