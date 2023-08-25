import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {GridToolbarContainer} from "@mui/x-data-grid";
import {Button} from "@mui/material";
const MainGridToolbar = ({ disabled, onEditButtonClick, onDeleteButtonClick }) => {
    return (
        <GridToolbarContainer>
            <Button
                size={"small"}
                startIcon={<AddIcon/>}
                onClick={onEditButtonClick}
            >
                Add
            </Button>
            <Button
                size={"small"}
                startIcon={<EditIcon/>}
                disabled={disabled}
                onClick={onEditButtonClick}
            >
                Edit
            </Button>
            <Button
                size={"small"}
                startIcon={<DeleteIcon/>}
                disabled={disabled}
                onClick={onDeleteButtonClick}
            >
                Delete
            </Button>
        </GridToolbarContainer>
    )
}

export default MainGridToolbar