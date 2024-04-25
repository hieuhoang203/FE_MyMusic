import httpClient from "../api/myApi";

export const selectRole = (status, page) => {
    return httpClient.get(`/admin/role?page=${page}?status=${status}`);
}

export const saveRole = (role) => {
    return httpClient.post(`/admin/role/save`, role);
}

export const updateRole = (id, role) => {
    return httpClient.put(`/admin/role/update/${id}`, role);
}

export const deleteRole = (id) => {
    return httpClient.delete(`/admin/role/delete/${id}`);
}

export const returnStatus = (id) => {
    return httpClient.get(`/admin/role/return/${id}`);
}

export const searchRole = (id) => {
    return httpClient.get(`/admin/role/search/${id}`);
}

export const getAllRole = (page) => {
    return  httpClient.get(`/admin/role/getAll?page=${page}`)
}