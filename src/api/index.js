import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080"
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
export const searchWarehousesByName = async (name) => {
    return await instance.get("/warehouses/search", { params: { name } })
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
export const searchSuppliersByName = async (name) => {
    return await instance.get("/suppliers/search", { params: { name } })
}



export const fetchClients = async (params) => {
    return await instance.get("/clients", { params })
}
export const saveClient = async (data) => {
    return await instance.post("/clients", data)
}
export const updateClient = async (id, data) => {
    return await instance.put("/clients/" + id, data)
}
export const deleteClient = async (id) => {
    return await instance.delete("/clients/" + id)
}
export const searchClientsByName = async (name) => {
    return await instance.get("/clients/search", { params: { name } })
}



export const fetchProducts = async (params) => {
    return await instance.get("/products", { params })
}
export const saveProduct = async (data) => {
    return await instance.post("/products", data)
}
export const updateProduct = async (id, data) => {
    return await instance.put("/products/" + id, data)
}
export const deleteProduct = async (id) => {
    return await instance.delete("/products/" + id)
}
export const searchProductsByName = async (name) => {
    return await instance.get("/products/search", { params: { name } })
}



export const fetchInputs = async (params) => {
    return await instance.get("/inputs", { params })
}
export const fetchInput = async (id) => {
    return await instance.get("/inputs/" + id)
}
export const saveInput = async (data) => {
    return await instance.post("/inputs", data)
}
export const updateInput = async (id, data) => {
    return await instance.put("/inputs/" + id, data)
}
export const deleteInput = async (id) => {
    return await instance.delete("/inputs/" + id)
}
export const fetchInputProducts = async (id, params) => {
    return await instance.get("/inputs/" + id + "/input-products", { params })
}
export const saveInputProduct = async (data) => {
    return await instance.post("/input-products", data)
}
export const updateInputProduct = async (id, data) => {
    return await instance.put("/input-products/" + id, data)
}
export const deleteInputProduct = async (id) => {
    return await instance.delete("/input-products/" + id)
}
export const searchInputProductsByProductName = async (productName) => {
    return await instance.get("/input-products/search", { params: { productName } })
}



export const fetchOutputs = async (params) => {
    return await instance.get("/outputs", { params })
}
export const fetchOutput = async (id) => {
    return await instance.get("/outputs/" + id)
}
export const saveOutput = async (data) => {
    return await instance.post("/outputs", data)
}
export const updateOutput = async (id, data) => {
    return await instance.put("/outputs/" + id, data)
}
export const deleteOutput = async (id) => {
    return await instance.delete("/outputs/" + id)
}
export const fetchOutputProducts = async (id, params) => {
    return await instance.get("/outputs/" + id + "/output-products", { params })
}
export const saveOutputProduct = async (data) => {
    return await instance.post("/output-products", data)
}
export const updateOutputProduct = async (id, data) => {
    return await instance.put("/output-products/" + id, data)
}
export const deleteOutputProduct = async (id) => {
    return await instance.delete("/output-products/" + id)
}



export const fetchUsers = async (params) => {
    return await instance.get("/users", { params })
}
export const saveUser = async (data) => {
    return await instance.post("/users", data)
}
export const updateUser = async (id, data) => {
    return await instance.put("/users/" + id, data)
}
export const deleteUser = async (id) => {
    return await instance.delete("/users/" + id)
}



export const fetchDailyInputs = async () => {
    return await instance.get("/dashboard/daily-inputs")
}
export const fetchDailyMostOutputProducts = async () => {
    return await instance.get("/dashboard/daily-most-output-products")
}