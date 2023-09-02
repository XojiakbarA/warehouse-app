import {Button, CircularProgress, ListSubheader, Paper, Stack, IconButton, Tooltip, ListItemIcon} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import {useCallback, useEffect, useState} from "react";
import MeasurementListSkeleton from "../skeletons/MeasurementListSkeleton";
import { deleteMeasurement, fetchMeasurements, saveMeasurement, updateMeasurement } from "../../api";
import AbstractDialog from "../dialogs/AbstractDialog";
import DeleteDialog from "../dialogs/DeleteDialog";

const MeasurementList = ({ onError, onCreateSuccess, onUpdateSuccess, onDeleteSuccess }) => {

    const resourceName = "Measurement"

    const [loading, setLoading] = useState(false)
    const [addLoading, setAddLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)

    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const [measurements, setMeasurements] = useState([])

    const [measurement, setMeasurement] = useState(null)

    const getMeasurements = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await fetchMeasurements()
            setMeasurements(data.data)
        } catch (e) {
            onError(e)
        }
        setLoading(false)
    }, [onError])

    useEffect(() => {
        getMeasurements()
    }, [getMeasurements])

    const handleCreateSubmit = async (data, { resetForm }) => {
        setAddLoading(true)
        try {
            const res = await saveMeasurement(data)
            if (res.status === 201) {
                setMeasurements(i => ([ ...i, res.data.data ]))
                resetForm()
                onCreateSuccess(res.status, resourceName)
            }
        } catch (e) {
            onError(e)
        }
        toggleAddDialog()
        setAddLoading(false)
    }
    const handleEditSubmit = async (data, { resetForm }) => {
        setUpdateLoading(true)
        try {
            const res = await updateMeasurement(measurement?.id, data)
            if (res.status === 200) {
                const measurement = res.data.data
                const newMeasurements = measurements.filter(m => m.id !== measurement.id)
                setMeasurements([ ...newMeasurements, measurement ])
                resetForm()
                onUpdateSuccess(res.status, resourceName)
            }
        } catch (e) {
            onError(e)
        }
        closeUpdateDialog()
        setUpdateLoading(false)
    }
    const handleDeleteClick = async () => {
        setDeleteLoading(true)
        try {
            const res = await deleteMeasurement(measurement?.id)
            if (res.status === 202) {
                const newMeasurements = measurements.filter(m => m.id !== measurement.id)
                setMeasurements(newMeasurements)
                onDeleteSuccess(res.status, resourceName)
            }
        } catch (e) {
            onError(e)
        }
        closeDeleteDialog()
        setDeleteLoading(false)
    }

    const toggleAddDialog = () => {
        setAddDialogOpen(i => !i)
    }
    const openUpdateDialog = (m) => {
        setMeasurement(m)
        setUpdateDialogOpen(true)
    }
    const closeUpdateDialog = () => {
        setMeasurement(null)
        setUpdateDialogOpen(false)
    }
    const openDeleteDialog = (m) => {
        setMeasurement(m)
        setDeleteDialogOpen(true)
    }
    const closeDeleteDialog = () => {
        setMeasurement(null)
        setDeleteDialogOpen(false)
    }

    return (
        <Stack spacing={2}>
            <List dense component={Paper}>
                <ListSubheader>Measurements</ListSubheader>
                {
                    loading
                    ?
                    <MeasurementListSkeleton/>
                    :
                    measurements.map(m => (
                        <ListItem
                            key={m.id}
                            secondaryAction={
                                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                                    {
                                        updateLoading && measurement?.id === m.id
                                        ?
                                        <CircularProgress color={"inherit"} size={18}/>
                                        :
                                        <Tooltip title={"Edit"}>
                                            <IconButton
                                                edge="end"
                                                aria-label="edit"
                                                disabled={deleteLoading && measurement?.id === m.id}
                                                onClick={ () => openUpdateDialog(m) }
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                    }
                                    {
                                        deleteLoading && measurement?.id === m.id
                                        ?
                                        <CircularProgress color={"inherit"} size={18}/>
                                        :
                                        <Tooltip title={"Delete"}>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                disabled={updateLoading && measurement?.id === m.id}
                                                onClick={ () => openDeleteDialog(m) }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    }
                                </Stack>
                            }
                        >
                            <ListItemIcon>{ m.active ? <CheckIcon/> : <ClearIcon/> }</ListItemIcon>
                            <ListItemText primary={m.name}/>
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
            <AbstractDialog
                title={"Add Measurement"}
                open={addDialogOpen}
                onClose={toggleAddDialog}
                initialValues={{ name: "", active: true }}
                onSubmit={handleCreateSubmit}
                loading={addLoading}
            />
            <AbstractDialog
                title={"Edit Measurement"}
                open={updateDialogOpen}
                onClose={closeUpdateDialog}
                initialValues={{ name: measurement?.name || "", active: measurement?.active || false }}
                onSubmit={handleEditSubmit}
                loading={updateLoading}
            />
            <DeleteDialog
                title={"Delete Measurement"}
                open={deleteDialogOpen}
                onClose={closeDeleteDialog}
                resourceName={measurement?.name || ""}
                onDeleteClick={handleDeleteClick}
                loading={deleteLoading}
            />
        </Stack>
    )
}

export default MeasurementList