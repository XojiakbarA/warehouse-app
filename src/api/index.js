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