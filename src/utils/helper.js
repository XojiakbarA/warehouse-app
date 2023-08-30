export const appendToFormData = (data) => {
    let formData = new FormData()
    for (let key in data) {
        if (data[key] instanceof Date) {
            formData.append(key, data[key].toISOString())
        } else if (data[key] instanceof FileList) {
            for (let file of data[key]) {
                formData.append(`${key}[]`, file)
            }
        } else if (Array.isArray(data[key])) {
            for (let item of data[key]) {
                formData.append(`${key}[]`, JSON.stringify(item))
            }
        } else if (data[key] != null) {
            formData.append(key, data[key])
        }
    }
    return formData
}