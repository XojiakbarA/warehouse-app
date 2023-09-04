import MainAlert from "../alerts/MainAlert";
import {Card, CircularProgress, ListSubheader, Stack, Link, Button} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {useMessage} from "../../hooks/useMessage";
import {useCallback, useEffect, useState} from "react";
import {fetchCountNearToExpireInputProducts} from "../../api";
import {Link as RRLink} from "react-router-dom";

const CountNearToExpire = () => {

    const { message, onError, clearMessage } = useMessage()
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState(null)

    const getCount = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await fetchCountNearToExpireInputProducts()
            setData(data.data)
        } catch (e) {
            onError(e)
        }
        setLoading(false)
    }, [onError])

    useEffect(() => {
        getCount()
    }, [getCount])

    return (
        <Stack spacing={2}>
            <MainAlert
                message={message}
                onClose={clearMessage}
            />
            <Card>
                <List dense>
                    <ListSubheader>Near to expire products</ListSubheader>
                    {
                        loading
                            ?
                            <ListItem>
                                <ListItemIcon>
                                    <CircularProgress/>
                                </ListItemIcon>
                            </ListItem>
                            :
                            !data
                                ?
                                <ListItem>
                                    <ListItemText primary={"No data"}/>
                                </ListItem>
                                :
                                <ListItem>
                                    <ListItemText
                                        primary={"Count"}
                                        primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                                        secondary={data.count}
                                        secondaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                                    />
                                </ListItem>
                    }
                </List>
                <Button disabled={data?.count === 0} component={RRLink} to={"/near-to-expire/input-products"}>More</Button>
            </Card>
        </Stack>
    )
}

export default CountNearToExpire