import httpClient from "../api/myApi";

export const selectGenres = (status, page) => {
    return httpClient.get(`/genres/admin?page=${page}?status=${status}`);
}

export const saveGenres = (genres) => {
    return httpClient.post(`/genres/admin/save`, genres);
}

export const updateGenres = (id, genres) => {
    return httpClient.put(`/genres/admin/update/${id}`, genres);
}

export const deleteGenres = (id) => {
    return httpClient.delete(`/genres/admin/delete/${id}`);
}

export const returnStatus = (id) => {
    return httpClient.get(`/genres/admin/return/${id}`);
}

export const searchGenres = (id) => {
    return httpClient.get(`/genres/admin/search/${id}`);
}

export const getAllGenres = (page) => {
    return httpClient.get(`/genres/admin/getAll?page=${page}`);
}

export const getGenresSelect = () => {
    return httpClient.get(`/genres/admin/get-genres-select`);
}