import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import MainAlert from "../components/alerts/MainAlert";
import CurrencyList from "../components/lists/CurrencyList";
import MeasurementList from "../components/lists/MeasurementList";
import {useMessage} from "../hooks/useMessage";

const Settings = () => {

    const { message, onError, onCreateSuccess, onUpdateSuccess, onDeleteSuccess, clearMessage } = useMessage()

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={"h4"} color={"primary"} marginTop>Settings</Typography>
            </Grid>
            <Grid item xs={12}>
                <MainAlert
                    message={message}
                    onClose={clearMessage}
                />
            </Grid>
            <Grid item xs={4}>
                <CurrencyList
                    onError={onError}
                    onCreateSuccess={onCreateSuccess}
                    onUpdateSuccess={onUpdateSuccess}
                    onDeleteSuccess={onDeleteSuccess}
                />
            </Grid>
            <Grid item xs={4}>
                <MeasurementList
                    onError={onError}
                    onCreateSuccess={onCreateSuccess}
                    onUpdateSuccess={onUpdateSuccess}
                    onDeleteSuccess={onDeleteSuccess}
                />
            </Grid>
        </Grid>
    )
}

export default Settings