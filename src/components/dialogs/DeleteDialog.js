import { LoadingButton } from "@mui/lab";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const DeleteDialog = ({ title, open, onClose, resourceName, loading, onDeleteClick }) => {
    return (
        <Dialog open={open} onClose={loading ? null : onClose} maxWidth={"xs"} fullWidth>
            <DialogTitle>{ title }</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Do you really want to remove "{resourceName}"?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>Cancel</Button>
                <LoadingButton onClick={onDeleteClick} loading={loading}>Yes</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog