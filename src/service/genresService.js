import httpClient from "../api/myApi";

export const selectGenres = (status, page) => {
    return httpClient.get(`/admin/genres?page=${page}?status=${status}`);
}

export const saveGenres = (genres) => {
    return httpClient.post(`/admin/genres/save`, genres);
}

export const updateGenres = (id, genres) => {
    return httpClient.put(`/admin/genres/update/${id}`, genres);
}

export const deleteGenres = (id) => {
    return httpClient.delete(`/admin/genres/delete/${id}`);
}

export const returnStatus = (id) => {
    return httpClient.get(`/admin/genres/return/${id}`);
}

export const searchGenres = (id) => {
   return httpClient.get(`/admin/genres/search/${id}`);
}

export const getAllGenres = (page) => {
   return  httpClient.get(`/admin/genres/getAll?page=${page}`)
}