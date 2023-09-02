import { Grid} from "@mui/material";
import MainAlert from "../components/alerts/MainAlert";
import DailyInputs from "../components/cards/DailyInputs";
import DailyMostOutputProducts from "../components/cards/DailyMostOutputProducts";
import {useMessage} from "../hooks/useMessage";

const Dashboard = () => {

    const { message, onError, clearMessage } = useMessage()

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <MainAlert
                    message={message}
                    onClose={clearMessage}
                />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Grid item xs={12}>
                            <DailyInputs onError={onError}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={9}>
                        <DailyMostOutputProducts onError={onError}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Dashboard