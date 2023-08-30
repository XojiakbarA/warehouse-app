import { Menu, MenuItem, ListItemIcon, Input } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'

const UploadMenu = ({
    open, anchorEl, name, disabled,
    handleClose, handleDeleteImage, handleUploadChange
}) => {

    return (
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'center', vertical: 'center' }}
        >
            <MenuItem
                onClick={e => {
                    handleDeleteImage()
                    handleClose()
                }}
                disabled={disabled}
            >
                <ListItemIcon>
                    <DeleteForeverIcon fontSize="small" />
                </ListItemIcon>
                Delete
            </MenuItem>
            <label htmlFor={name}>
                <Input
                    accept="image/*"
                    id={name}
                    type="file"
                    sx={{display: 'none'}}
                    name={name}
                    onChange={e => {
                        handleUploadChange(e)
                        handleClose()
                    }}
                />
                <MenuItem aria-label="upload picture" component="span">
                    <ListItemIcon>
                        <AddAPhotoIcon fontSize="small" />
                    </ListItemIcon>
                    Upload
                </MenuItem>
            </label>
        </Menu>
    )
}

export default UploadMenu