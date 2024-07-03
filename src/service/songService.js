import axiosHelper from "../api/myApi";

const config = {
    headers: {
        "Content-Type": "multipart/form-data",
    },
};

export const getSongByStatus = (page, status) => {
    return axiosHelper.get(`/song/admin?status=${status}?page=${page}`);
}

export const getAllSong = (page) => {
    return axiosHelper.get(`/song/admin/get-all-song?page=${page}`);
}

export const updateStatusSong = (id, status) => {
    return axiosHelper.get(`/song/admin/update-song-status?id=${id}&status=${status}`);
}

export const saveSong = (song) => {
    return axiosHelper.post(`/song/admin/save`, song, config);
}

export const updateSong = (id, song) => {
    return axiosHelper.put(`/song/admin/update/${id}`, song, config);
}

export const searchSong = (id) => {
    return axiosHelper.get(`/song/admin/search/${id}`)
}