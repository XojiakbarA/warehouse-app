import Typography from "@mui/material/Typography";
import {Card, CircularProgress, ListSubheader, Stack} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {useCallback, useEffect, useState} from "react";
import {fetchDailyInputs} from "../../api";
import MainAlert from "../alerts/MainAlert";
import { useMessage } from "../../hooks/useMessage";

const DailyInputs = () => {

    const { message, onError, clearMessage } = useMessage()
    const [loading, setLoading] = useState(false)

    const [dailyInputs, setDailyInputs] = useState(null)

    const getDailyInputs = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await fetchDailyInputs()
            setDailyInputs(data.data)
        } catch (e) {
            onError(e)
        }
        setLoading(false)
    }, [onError])

    useEffect(() => {
        getDailyInputs()
    }, [getDailyInputs])

    return (
        <Stack spacing={2}>
            <Typography variant={"h5"} color={"primary"} marginTop>Daily Inputs</Typography>
            <MainAlert
                message={message}
                onClose={clearMessage}
            />
            <Card>
                <List dense>
                    <ListSubheader>Total Cost</ListSubheader>
                    {
                        loading
                            ?
                            <ListItem>
                                <ListItemIcon>
                                    <CircularProgress/>
                                </ListItemIcon>
                            </ListItem>
                            :
                            !dailyInputs
                            ?
                            <ListItem>
                                <ListItemText primary={"No data"}/>
                            </ListItem>
                            :
                            dailyInputs?.totalCost.map(t => (
                                <ListItem key={t.currencyCode}>
                                    <ListItemText
                                        primary={t.currencyCode}
                                        primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                                        secondary={t.sum}
                                        secondaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                                    />
                                </ListItem>
                            ))
                    }
                </List>
            </Card>
            <Card>
                <List dense>
                    <ListSubheader>Total Amount</ListSubheader>
                    {
                        loading
                            ?
                            <ListItem>
                                <ListItemIcon>
                                    <CircularProgress/>
                                </ListItemIcon>
                            </ListItem>
                            :
                            !dailyInputs
                            ?
                            <ListItem>
                                <ListItemText primary={"No data"}/>
                            </ListItem>
                            :
                            dailyInputs?.totalAmount.map(t => (
                                <ListItem key={t.measurementName}>
                                    <ListItemText
                                        primary={t.measurementName}
                                        primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                                        secondary={t.sum}
                                        secondaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                                    />
                                </ListItem>
                            ))
                    }
                </List>
            </Card>
        </Stack>
    )
}

export default DailyInputs