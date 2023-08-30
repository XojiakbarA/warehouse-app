import {Badge, Box, Button, FormHelperText, IconButton} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import UploadMenu from "./UploadMenu";
import {useState} from "react";
import CardImage from "./CardImage";

const ImageUpload = ({
     handlePreviewDeleteClick, handleUploadChange, handleDeleteImage,
     isLoading, name, src, preview, width, height, error, helperText, ...others
 }) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box {...others}>
            <Badge
                sx={{ width }}
                overlap='rectangular'
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                badgeContent={
                    preview &&
                    <IconButton size='small' color='error' onClick={handlePreviewDeleteClick}>
                        <RemoveCircleIcon fontSize='small'/>
                    </IconButton>
                }
            >
                <Button
                    color={"inherit"}
                    sx={{ width }}
                    onClick={handleClick}
                >
                    <CardImage
                        publicId={src}
                        width={width}
                        height={height}
                        preview={preview}
                    />
                </Button>
            </Badge>
            <FormHelperText error={error}>{helperText}</FormHelperText>
            <UploadMenu
                open={open}
                anchorEl={anchorEl}
                name={name}
                disabled={!src}
                handleClose={handleClose}
                handleDeleteImage={handleDeleteImage}
                handleUploadChange={handleUploadChange}
            />
        </Box>
    )
}

export default ImageUpload