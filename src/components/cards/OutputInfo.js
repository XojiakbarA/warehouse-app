import {Card, Grid, ListSubheader, Skeleton} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from '@mui/icons-material/Clear';
import {useCallback, useEffect, useState} from "react";
import {fetchOutput} from "../../api";
import {useParams} from "react-router";
import MainAlert from "../alerts/MainAlert";

const OutputInfo = () => {

    const { id } = useParams()

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)
    const [output, setOutput] = useState(null)

    const getOutput = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await fetchOutput(id)
            setOutput(data.data)
        } catch (e) {
            console.log(e)
            setError(e.response?.data?.message)
        }
        setLoading(false)
    }, [id])

    useEffect(() => {
        getOutput()
    }, [getOutput])

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <MainAlert
                    error={error}
                    onErrorCloseClick={() => setError(null)}
                    success={success}
                    onSuccessCloseClick={() => setSuccess(null)}
                />
            </Grid>
            <Grid item xs>
                <Card>
                    <List dense>
                        <ListSubheader>Client</ListSubheader>
                        <ListItem>
                            <ListItemText
                                primary={"ID"}
                                primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                                secondary={loading ? <Skeleton width={20}/> : output?.client?.id}
                                secondaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={"Name"}
                                primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                                secondary={loading ? <Skeleton width={120}/> : output?.client?.name}
                                secondaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={"Phone Number"}
                                primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                                secondary={loading ? <Skeleton width={120}/> : output?.client?.phoneNumber}
                                secondaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={"Active"}
                                primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                                secondary={output?.client?.active ? <CheckIcon/> : <ClearIcon/>}
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
                                secondary={loading ? <Skeleton width={20}/> : output?.warehouse?.id}
                                secondaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={"Name"}
                                primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                                secondary={loading ? <Skeleton width={120}/> : output?.warehouse?.name}
                                secondaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={"Active"}
                                primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                                secondary={output?.warehouse?.active ? <CheckIcon/> : <ClearIcon/>}
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
                                secondary={loading ? <Skeleton width={120}/> : new Date(output?.date).toLocaleString()}
                                secondaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={"Currency"}
                                primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                                secondary={loading ? <Skeleton width={60}/> : output?.currency?.currencyCode}
                                secondaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={"Facture Number"}
                                primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                                secondary={loading ? <Skeleton width={120}/> : output?.factureNumber}
                                secondaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                            />
                        </ListItem>
                    </List>
                </Card>
            </Grid>
        </Grid>
    )
}

export default OutputInfo