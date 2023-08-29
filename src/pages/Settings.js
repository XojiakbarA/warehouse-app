import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import MainAlert from "../components/alerts/MainAlert";
import {useState} from "react";
import CurrencyList from "../components/lists/CurrencyList";
import MeasurementList from "../components/lists/MeasurementList";

const Settings = () => {

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={"h4"} color={"primary"} marginTop>Settings</Typography>
            </Grid>
            <Grid item xs={12}>
                <MainAlert
                    error={error}
                    onErrorCloseClick={() => setError(null)}
                    success={success}
                    onSuccessCloseClick={() => setSuccess(null)}
                />
            </Grid>
            <Grid item xs={4}>
                <CurrencyList
                    setError={setError}
                    setSuccess={setSuccess}
                />
            </Grid>
            <Grid item xs={4}>
                <MeasurementList
                    setError={setError}
                    setSuccess={setSuccess}
                />
            </Grid>
        </Grid>
    )
}

export default Settings