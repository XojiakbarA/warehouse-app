import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AlertTitle from "@mui/material/AlertTitle";

const MainAlert = ({ error, onErrorCloseClick, success, onSuccessCloseClick }) => {
    return (
        <>
            <Collapse in={Boolean(error)}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={onErrorCloseClick}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>
            </Collapse>
            <Collapse in={Boolean(success)}>
                <Alert
                    severity="success"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={onSuccessCloseClick}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    <AlertTitle>Success</AlertTitle>
                    {success}
                </Alert>
            </Collapse>
        </>
    )
}

export default MainAlert