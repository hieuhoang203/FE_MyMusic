import axiosHelper from "../api/myApi";

const config = {
    headers: {
        "Content-Type": "multipart/form-data",
    },
};

export const getSongByStatus = (page, status) => {
    return axiosHelper.get(`/song?status=${status}?page=${page}`);
}

export const getAllSong = (page) => {
    return axiosHelper.get(`/song/get-all-song?page=${page}`);
}

export const updateStatusSong = (id, status) => {
    return axiosHelper.get(`/song/update-song-status?id=${id}&status=${status}`);
}

export const saveSong = (song, type) => {
    return axiosHelper.post(`/song/save?type=${type}`, song, config);
}

export const updateSong = (id, song, type) => {
    return axiosHelper.put(`/song/update/${id}?type=${type}`, song, config);
}

export const searchSong = (id) => {
    return axiosHelper.get(`/song/search/${id}`)
}