import axiosHelper from "../api/myApi";

const config = {
    headers: {
        "Content-Type": "multipart/form-data",
    },
};

export const getSongByStatus = (page, status) => {
    return axiosHelper.get(`/admin/song?status=${status}?page=${page}`);
}

export const getAllSong = (page) => {
    return axiosHelper.get(`/admin/song/get-all-song?page=${page}`);
}

export const updateStatusSong = (id, status) => {
    return axiosHelper.get(`/admin/song/update-song-status/${id}?status=${status}`);
}

export const saveSong = (song) => {;
    return axiosHelper.post(`/admin/song/save`, song, config)
}

export const updateSong = (id, song) => {
    return axiosHelper.post(`/admin/song/update/${id}`, song, config);
}