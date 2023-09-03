import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {GridToolbarContainer} from "@mui/x-data-grid";
import {Button} from "@mui/material";
const MainGridToolbar = ({ loading, disabled, onAddButtonClick, onEditButtonClick, onDeleteButtonClick }) => {
    return (
        <GridToolbarContainer>
            <Button
                size={"small"}
                startIcon={<AddIcon/>}
                disabled={loading}
                onClick={onAddButtonClick}
            >
                Add
            </Button>
            <Button
                size={"small"}
                startIcon={<EditIcon/>}
                disabled={loading || disabled}
                onClick={onEditButtonClick}
            >
                Edit
            </Button>
            <Button
                size={"small"}
                startIcon={<DeleteIcon/>}
                disabled={loading || disabled}
                onClick={onDeleteButtonClick}
            >
                Delete
            </Button>
        </GridToolbarContainer>
    )
}

export default MainGridToolbar