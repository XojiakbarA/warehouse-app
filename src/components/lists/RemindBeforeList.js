import {
    Card, CardContent,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Stack
} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {
    deleteRemindBeforeOption,
    fetchRemindBeforeOptions,
    saveRemindBeforeOption,
    updateRemindBeforeOption
} from "../../api";
import {useMessage} from "../../hooks/useMessage";
import MainAlert from "../alerts/MainAlert";
import {LoadingButton} from "@mui/lab";
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteDialog from "../dialogs/DeleteDialog";
import AbstractDialog from "../dialogs/AbstractDialog";
import RemindBeforeDialog from "../dialogs/RemindBeforeDialog";

const RemindBeforeList = () => {

    const [loading, setLoading] = useState(false)
    const [addLoading, setAddLoading] = useState(false)
    const [editLoading, setEditLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const { message, onError, clearMessage } = useMessage()
    const [options, setOptions] = useState([])
    const [id, setId] = useState(null)

    const handleCreateSubmit = async (data, {resetForm}) => {
        setAddLoading(true)
        try {
            const res = await saveRemindBeforeOption(data)
            if (res.status === 201) {
                setOptions(i => ([ ...i, res.data.data ]))
                resetForm()
            }
        } catch (e) {
            onError(e)
        }
        toggleAddDialog()
        setAddLoading(false)
    }
    const handleEditSubmit = async (e) => {
        setEditLoading(true)
        try {
            const res = await updateRemindBeforeOption(e.target.value)
            if (res.status === 200) {
                const newOptions = options.map(o => {
                    o.selected = o.id === Number(e.target.value);
                    return o
                })
                setOptions(newOptions)
            }
        } catch (e) {
            onError(e)
        }
        setEditLoading(false)
    }
    const handleDeleteClick = async () => {
        setDeleteLoading(true)
        try {
            const res = await deleteRemindBeforeOption(id)
            if (res.status === 202) {
                const newOptions = options.filter(o => o.id !== id)
                setOptions(newOptions)
            }
        } catch (e) {
            onError(e)
        }
        closeDeleteDialog()
        setLoading(false)
    }
    const toggleAddDialog = () => {
        setAddDialogOpen(i => !i)
    }
    const openDeleteDialog = (id) => {
        setId(id)
        setDeleteDialogOpen(true)
    }
    const closeDeleteDialog = () => {
        setId(null)
        setDeleteDialogOpen(false)
    }

    const getRemindBeforeOptions = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await fetchRemindBeforeOptions()
            setOptions(data.data)
        } catch (e) {
            onError(e)
        }
        setLoading(false)
    }, [onError])

    useEffect(() => {
        getRemindBeforeOptions()
    }, [getRemindBeforeOptions])

    return (
        <Stack spacing={2}>
            <MainAlert
                message={message}
                onClose={clearMessage}
            />
            {
                loading
                ?
                <CircularProgress/>
                :
                    <Card>
                        <CardContent>
                            <Stack spacing={2}>
                                <FormControl>
                                    <FormLabel id="notify-near-to-expire">Remind Before</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="notify-near-to-expire"
                                        name="id"
                                        onChange={handleEditSubmit}
                                    >
                                        {
                                            options.map(o => (
                                                <Stack key={o.id} direction={"row"} justifyContent={"space-between"}>
                                                    <FormControlLabel
                                                        disabled={editLoading}
                                                        key={o.id}
                                                        value={o.id}
                                                        control={<Radio checked={o.selected} />}
                                                        label={o.value + " days"}
                                                    />
                                                    <IconButton
                                                        disabled={o.selected}
                                                        onClick={ () => openDeleteDialog(o.id) }
                                                    >
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </Stack>
                                            ))
                                        }
                                    </RadioGroup>
                                </FormControl>
                            </Stack>
                        </CardContent>
                    </Card>
            }
            <LoadingButton
                loading={addLoading}
                startIcon={<AddIcon/>}
                onClick={toggleAddDialog}
            >
                Add
            </LoadingButton>
            <RemindBeforeDialog
                title={"Add Days"}
                open={addDialogOpen}
                onClose={toggleAddDialog}
                initialValues={{ value: "" }}
                onSubmit={handleCreateSubmit}
                loading={addLoading}
            />
            <DeleteDialog
                title={"Delete Option"}
                open={deleteDialogOpen}
                onClose={closeDeleteDialog}
                resourceName={"option"}
                onDeleteClick={handleDeleteClick}
                loading={deleteLoading}
            />
        </Stack>
    )
}

export default RemindBeforeList