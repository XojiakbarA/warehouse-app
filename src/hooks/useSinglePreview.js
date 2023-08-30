import { useState } from "react"

export const useSinglePreview = (setValues, setTouched) => {

    const [preview, setPreview] = useState(null)

    const handlePreviewDeleteClick = () => {
        setValues(prevValues => ({ ...prevValues, photo: null }))
        setPreview(null)
    }

    const handleUploadChange = (e) => {
        const photo = e.target.files[0]
        const url = URL.createObjectURL(photo)
        setTouched({ photo: true })
        setValues(prevValues => ({ ...prevValues, photo }))
        setPreview(url)
    }

    return { preview, handlePreviewDeleteClick, handleUploadChange }
}