import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

const WarehouseDialog = ({ open, onClose, warehouse }) => {

    return (
        <Dialog open={open} onClose={onClose} maxWidth={"xs"} fullWidth>
            <DialogTitle>Warehouse</DialogTitle>
            <DialogContent>
                <TextField
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    name={"name"}
                    value={warehouse?.name}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onClose}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

export default WarehouseDialog