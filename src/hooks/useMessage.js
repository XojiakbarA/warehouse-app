import {useCallback, useState} from "react";

export const useMessage = () => {
    const [message, setMessage] = useState({ code: null, text: null, error: false })

    const onCreateSuccess = (code, resourceName) => {
        setMessage({ code, text: resourceName + " created successfully", error: false })
    }
    const onUpdateSuccess = (code, resourceName) => {
        setMessage({ code, text: resourceName + " updated successfully", error: false })
    }
    const onDeleteSuccess = (code, resourceName) => {
        setMessage({ code, text: resourceName + " deleted successfully", error: false })
    }
    const onError = useCallback((e) => {
        let code, text
        if (e.response) {
            code = e.response.status
            text = e.response.data.message
        } else {
            code = e.code;
            text = e.message
        }
        setMessage({ code, text, error: true })
    }, [])

    const clearMessage = () => {
        setMessage(i => ({ ...i, text: null }))
    }

    return { onCreateSuccess, onUpdateSuccess, onDeleteSuccess, onError, clearMessage, message }
}