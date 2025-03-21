import httpClient from "../api/myApi";

export const selectGenres = (status, page) => {
    return httpClient.get(`/genres?page=${page}?status=${status}`);
}

export const saveGenres = (genres) => {
    return httpClient.post(`/genres/save`, genres);
}

export const updateGenres = (id, genres) => {
    return httpClient.put(`/genres/update/${id}`, genres);
}

export const deleteGenres = (id) => {
    return httpClient.delete(`/genres/delete/${id}`);
}

export const returnStatus = (id) => {
    return httpClient.get(`/genres/return/${id}`);
}

export const searchGenres = (id) => {
    return httpClient.get(`/genres/search/${id}`);
}

export const getAllGenres = (page) => {
    return httpClient.get(`/genres/getAll?page=${page}`);
}

export const getGenresSelect = () => {
    return httpClient.get(`/genres/get-genres-select`);
}