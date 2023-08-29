import axios from "axios";

const instance = axios.create({
    baseURL: "https://ominous-space-invention-v7pj6w9vj79hpp6x-8080.app.github.dev"
})

export const fetchWarehouses = async (params) => {
    return await instance.get("/warehouses", { params })
}
export const saveWarehouse = async (data) => {
    return await instance.post("/warehouses", data)
}
export const updateWarehouse = async (id, data) => {
    return await instance.put("/warehouses/" + id, data)
}
export const deleteWarehouse = async (id) => {
    return await instance.delete("/warehouses/" + id)
}



export const fetchCategories = async (params) => {
    return await instance.get("/categories", { params })
}
export const saveCategory = async (data) => {
    return await instance.post("/categories", data)
}
export const updateCategory = async (id, data) => {
    return await instance.put("/categories/" + id, data)
}
export const deleteCategory = async (id) => {
    return await instance.delete("/categories/" + id)
}
export const searchCategoriesByName = async (name) => {
    return await instance.get("/categories/search", { params: { name } })
}



export const fetchCurrencies = async () => {
    return await instance.get("/currencies")
}
export const saveCurrency = async (data) => {
    return await instance.post("/currencies", data)
}
export const updateCurrency = async (id, data) => {
    return await instance.put("/currencies/" + id, data)
}
export const deleteCurrency = async (id) => {
    return await instance.delete("/currencies/" + id)
}
export const fetchAvailableCurrencies = async (name) => {
    return await instance.get("/currencies/available", { params: { name } })
}



export const fetchMeasurements = async () => {
    return await instance.get("/measurements")
}
export const saveMeasurement = async (data) => {
    return await instance.post("/measurements", data)
}
export const updateMeasurement = async (id, data) => {
    return await instance.put("/measurements/" + id, data)
}
export const deleteMeasurement = async (id) => {
    return await instance.delete("/measurements/" + id)
}



export const fetchSuppliers = async (params) => {
    return await instance.get("/suppliers", { params })
}
export const saveSupplier = async (data) => {
    return await instance.post("/suppliers", data)
}
export const updateSupplier = async (id, data) => {
    return await instance.put("/suppliers/" + id, data)
}
export const deleteSupplier = async (id) => {
    return await instance.delete("/suppliers/" + id)
}