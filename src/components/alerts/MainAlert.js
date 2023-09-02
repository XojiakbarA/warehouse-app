import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AlertTitle from "@mui/material/AlertTitle";

const MainAlert = ({ message, onClose }) => {
    return (
        <>
            <Collapse in={Boolean(message.text)}>
                <Alert
                    severity={message.error ? "error" : "success"}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={onClose}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    <AlertTitle>{ message.error ? "Error" : "Success" } {message.code}</AlertTitle>
                    {message.text}
                </Alert>
            </Collapse>
        </>
    )
}

export default MainAlert