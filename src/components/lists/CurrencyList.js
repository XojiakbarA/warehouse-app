import {Button, CircularProgress, ListSubheader, Paper, Stack, Switch, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import {useCallback, useEffect, useState} from "react";
import {deleteCurrency, fetchCurrencies, saveCurrency, updateCurrency} from "../../api";
import CurrencyDialog from "../dialogs/CurrencyDialog";
import DeleteDialog from "../dialogs/DeleteDialog";
import CurrencyListSkeleton from "../skeletons/CurrencyListSkeleton";
import ListItem from "@mui/material/ListItem";

const CurrencyList = ({ setError, setSuccess }) => {

    const [loading, setLoading] = useState(false)
    const [addLoading, setAddLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)

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

    const handleCreateSubmit = async (data, { resetForm }) => {
        setAddLoading(true)
        try {
            const res = await saveCurrency(data)
            if (res.status === 201) {
                setCurrencies(i => ([ ...i, res.data.data ]))
                toggleAddDialog()
                resetForm()
                setSuccess("Currency created successfully")
            }
        } catch (e) {
            console.log(e)
            setError(e.response?.data?.message)
        }
        setAddLoading(false)
    }
    const handleEditSubmit = async (c) => {
        setCurrency(c)
        setUpdateLoading(true)
        try {
            const data = { active: !c.active }
            const res = await updateCurrency(c.id, data)
            if (res.status === 200) {
                const currency = res.data.data
                const newCurrencies = currencies.filter(c => c.id !== currency.id)
                setCurrencies([ ...newCurrencies, currency ])
                setSuccess("Currency updated successfully")
            }
        } catch (e) {
            console.log(e)
            setError(e.response?.data?.message)
        }
        setCurrency(null)
        setUpdateLoading(false)
    }
    const handleDeleteClick = async () => {
        setDeleteLoading(true)
        try {
            const res = await deleteCurrency(currency?.id)
            if (res.status === 202) {
                const newCurrencies = currencies.filter(c => c.id !== currency.id)
                setCurrencies(newCurrencies)
                closeDeleteDialog()
                setSuccess("Category deleted successfully")
            }
        } catch (e) {
            console.log(e)
            setError(e.response.data.message)
        }
        setDeleteLoading(false)
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
                    loading
                    ?
                    <CurrencyListSkeleton/>
                    :
                    currencies.map(c => (
                        <ListItem
                            key={c.id}
                            secondaryAction={
                                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                                    {
                                        updateLoading && currency?.id === c.id
                                        ?
                                        <CircularProgress color={"inherit"} size={18}/>
                                        :
                                        <Tooltip title={c.active ? "Active" : "Inactive"}>
                                            <Switch
                                                disabled={deleteLoading && currency?.id === c.id}
                                                checked={c.active}
                                                size={"small"}
                                                onChange={ () => handleEditSubmit(c) }
                                            />
                                        </Tooltip>
                                    }
                                    {
                                        deleteLoading && currency?.id === c.id
                                        ?
                                        <CircularProgress color={"inherit"} size={18}/>
                                        :
                                        <Tooltip title={"Delete"}>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                disabled={updateLoading && currency?.id === c.id}
                                                onClick={ () => openDeleteDialog(c) }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    }
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
                disabled={loading}
                startIcon={<AddIcon/>}
                onClick={toggleAddDialog}
            >
                Add
            </Button>
            <CurrencyDialog
                open={addDialogOpen}
                title={"Add Currency"}
                loading={addLoading}
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
                loading={deleteLoading}
            />
        </Stack>
    )
}

export default CurrencyList