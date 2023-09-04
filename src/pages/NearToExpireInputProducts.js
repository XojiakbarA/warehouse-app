import {Grid, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import MainAlert from "../components/alerts/MainAlert";
import {DataGrid} from "@mui/x-data-grid";
import {inputProductColumns} from "../utils/columns/inputProduct";
import {useMessage} from "../hooks/useMessage";
import {useCallback, useEffect, useState} from "react";
import {fetchNearToExpireInputProducts} from "../api";

const NearToExpireInputProducts = () => {

    const { message, onError, clearMessage } = useMessage()
    const [loading, setLoading] = useState(false)
    const [inputProducts, setInputProducts] = useState([])

    const getInputProducts = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await fetchNearToExpireInputProducts()
            setInputProducts(data.data)
        } catch (e) {
            onError(e)
        }
        setLoading(false)
    }, [onError])

    useEffect(() => {
        getInputProducts()
    }, [getInputProducts])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={"h4"} color={"primary"} marginTop>Input Products</Typography>
            </Grid>
            <Grid item xs={12}>
                <MainAlert
                    message={message}
                    onClose={clearMessage}
                />
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <DataGrid
                        autoHeight
                        disableColumnMenu
                        disableRowSelectionOnClick
                        loading={loading}
                        columns={inputProductColumns}
                        rows={inputProducts}
                        hideFooter
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default NearToExpireInputProducts