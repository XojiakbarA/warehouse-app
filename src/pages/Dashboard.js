import { Grid} from "@mui/material";
import DailyInputs from "../components/cards/DailyInputs";
import DailyMostOutputProducts from "../components/cards/DailyMostOutputProducts";
import CountNearToExpire from "../components/cards/CountNearToExpire";

const Dashboard = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Grid item xs={12}>
                            <DailyInputs/>
                        </Grid>
                        <Grid item xs={12}>
                            <CountNearToExpire/>
                        </Grid>
                    </Grid>
                    <Grid item xs={9}>
                        <DailyMostOutputProducts/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Dashboard