import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const DeleteDialog = ({ open, onClose, resourceName }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth={"xs"} fullWidth>
            <DialogTitle>Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Do you really want to remove "{resourceName}"?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onClose}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog