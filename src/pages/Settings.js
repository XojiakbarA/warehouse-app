import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import CurrencyList from "../components/lists/CurrencyList";
import MeasurementList from "../components/lists/MeasurementList";

const Settings = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={"h4"} color={"primary"} marginTop>Settings</Typography>
            </Grid>
            <Grid item xs={4}>
                <CurrencyList/>
            </Grid>
            <Grid item xs={4}>
                <MeasurementList/>
            </Grid>
        </Grid>
    )
}

export default Settings