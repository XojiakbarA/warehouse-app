import {Card, Grid, ListSubheader, Skeleton} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from '@mui/icons-material/Clear';
import {useCallback, useEffect, useState} from "react";
import {fetchInput} from "../../api";
import {useParams} from "react-router";
import MainAlert from "../alerts/MainAlert";
import { useMessage } from "../../hooks/useMessage";

const InputInfo = () => {

    const { id } = useParams()

    const { message, onError, clearMessage } = useMessage()
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState(null)

    const getInput = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await fetchInput(id)
            setInput(data.data)
        } catch (e) {
            onError(e)
        }
        setLoading(false)
    }, [id, onError])

    useEffect(() => {
        getInput()
    }, [getInput])

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <MainAlert
                    message={message}
                    onClose={clearMessage}
                />
            </Grid>
            <Grid item xs>
                <Card>
                    <List dense>
                        <ListSubheader>Supplier</ListSubheader>
                        <ListItem>
                            <ListItemText
                                primary={"ID"}
                                primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                                secondary={loading ? <Skeleton width={20}/> : input?.supplier?.id}
                                secondaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={"Name"}
                                primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                                secondary={loading ? <Skeleton width={120}/> : input?.supplier?.name}
                                secondaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={"Phone Number"}
                                primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                                secondary={loading ? <Skeleton width={120}/> : input?.supplier?.phoneNumber}
                                secondaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={"Active"}
                                primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                                secondary={input?.supplier?.active ? <CheckIcon/> : <ClearIcon/>}
                            />
                        </ListItem>
                    </List>
                </Card>
            </Grid>
            <Grid item xs>
                <Card>
                    <List dense>
                        <ListSubheader>Warehouse</ListSubheader>
                        <ListItem>
                            <ListItemText
                                primary={"ID"}
                                primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                                secondary={loading ? <Skeleton width={20}/> : input?.warehouse?.id}
                                secondaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={"Name"}
                                primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                                secondary={loading ? <Skeleton width={120}/> : input?.warehouse?.name}
                                secondaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={"Active"}
                                primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                                secondary={input?.warehouse?.active ? <CheckIcon/> : <ClearIcon/>}
                            />
                        </ListItem>
                    </List>
                </Card>
            </Grid>
            <Grid item xs>
                <Card>
                    <List dense>
                        <ListSubheader>Additional</ListSubheader>
                        <ListItem>
                            <ListItemText
                                primary={"Date"}
                                primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                                secondary={loading ? <Skeleton width={120}/> : new Date(input?.date).toLocaleString()}
                                secondaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={"Currency"}
                                primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                                secondary={loading ? <Skeleton width={60}/> : input?.currency?.currencyCode}
                                secondaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={"Facture Number"}
                                primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                                secondary={loading ? <Skeleton width={120}/> : input?.factureNumber}
                                secondaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                            />
                        </ListItem>
                    </List>
                </Card>
            </Grid>
        </Grid>
    )
}

export default InputInfo