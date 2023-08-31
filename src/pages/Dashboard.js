import { Grid} from "@mui/material";
import MainAlert from "../components/alerts/MainAlert";
import {useState} from "react";
import DailyInputs from "../components/cards/DailyInputs";
import DailyMostOutputProducts from "../components/cards/DailyMostOutputProducts";

const Dashboard = () => {

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <MainAlert
                    error={error}
                    onErrorCloseClick={() => setError(null)}
                    success={success}
                    onSuccessCloseClick={() => setSuccess(null)}
                />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Grid item xs={12}>
                            <DailyInputs setError={setError}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={9}>
                        <DailyMostOutputProducts setError={setError}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Dashboard