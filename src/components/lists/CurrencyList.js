import {Button, ListSubheader, Paper, Stack, Switch} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import {useCallback, useEffect, useState} from "react";
import {fetchCurrencies} from "../../api";
import CurrencyDialog from "../dialogs/CurrencyDialog";
import DeleteDialog from "../dialogs/DeleteDialog";

const CurrencyList = ({ setError }) => {

    const [loading, setLoading] = useState(false)
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const [currencies, setCurrencies] = useState([])

    const [currency, setCurrency] = useState(null)

    const getCurrencies = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await fetchCurrencies()
            setCurrencies(data.data)
        } catch (e) {
            console.log(e)
            setError(e.response?.data?.message)
        }
        setLoading(false)
    }, [setError])

    const handleCreateSubmit = (data, { resetForm }) => {
        console.log(data)
    }
    const handleEditSubmit = (id) => {
        console.log(id)
    }
    const handleDeleteClick = () => {
        console.log(currency)
    }

    useEffect(() => {
        getCurrencies()
    }, [getCurrencies])

    const toggleAddDialog = () => {
        setAddDialogOpen(i => !i)
    }
    const openDeleteDialog = (c) => {
        setCurrency(c)
        setDeleteDialogOpen(i => !i)
    }
    const closeDeleteDialog = () => {
        setCurrency(null)
        setDeleteDialogOpen(i => !i)
    }

    return (
        <Stack spacing={2}>
            <List dense component={Paper}>
                <ListSubheader>Currencies</ListSubheader>
                {
                    currencies.map(c => (
                        <ListItem
                            key={c.id}
                            secondaryAction={
                                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                                    <Switch checked={c.active} size={"small"} onChange={ () => handleEditSubmit(c.id) }/>
                                    <IconButton edge="end" aria-label="delete"
                                                onClick={ () => openDeleteDialog(c) }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>
                            }
                        >
                            <ListItemText
                                primary={c.currencyCode}
                                secondary={c.currencyName}
                            />
                        </ListItem>
                    ))
                }
            </List>
            <Button
                startIcon={<AddIcon/>}
                onClick={toggleAddDialog}
            >
                Add
            </Button>
            <CurrencyDialog
                open={addDialogOpen}
                title={"Add Currency"}
                loading={loading}
                onClose={toggleAddDialog}
                onSubmit={handleCreateSubmit}
                currency={currency}
                setCurrency={setCurrency}
            />
            <DeleteDialog
                title={"Delete Currency"}
                open={deleteDialogOpen}
                onClose={closeDeleteDialog}
                resourceName={currency?.currencyCode || ""}
                onDeleteClick={handleDeleteClick}
                loading={loading}
            />
        </Stack>
    )
}

export default CurrencyList