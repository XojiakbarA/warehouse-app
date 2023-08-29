import {Grid, ListSubheader, Paper, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import MainAlert from "../components/alerts/MainAlert";
import {useState} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ListItemText from "@mui/material/ListItemText";
import CurrencyList from "../components/lists/CurrencyList";

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

                />
            </Grid>
        </Grid>
    )
}

export default Settings