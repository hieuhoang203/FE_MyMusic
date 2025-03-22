import axiosHelper from "../api/myApi";

const config = {
    headers: {
        "Content-Type": "multipart/form-data",
    },
};

export const getAllUser = (page) => {
    return axiosHelper.get(`/user/get-all-user?page=${page}`);
}

export const getUserByStatus = (status, page) => {
    return axiosHelper.get(`/user/get-all-user/${status}`, page);
}

export const getAllArtis = (page) => {
    return axiosHelper.get(`/user/get-all-artis?page=${page}`);
}

export const getArtisByStatus = (status, page) => {
    return axiosHelper.get(`/user/get-all-artis/${status}`, page);
}

export const getNewUserOrArtis = (role) => {
    return axiosHelper.get(`/user/new-user/${role}`);
}

export const saveUser = (type, user) => {
    return axiosHelper.post(`/user/save?type=${type}`, user, config);
}

export const searchUser = (id) => {
    return axiosHelper.get(`/user/search/${id}`);
}

export const updateStatusUser = (id, status) => {
    return axiosHelper.get(`/user/update-status?id=${id}&status=${status}`)
}

export const updateUser = (id, user) => {
    return axiosHelper.put(`/user/update/${id}`, user, config);
}

export const getArtisSelect = () => {
    return axiosHelper.get(`/user/get-artis-select`);
}

export const changeStatusUser = (id, status) => {
    return axiosHelper.put(`/user/change-status/${id}&status=${status}`)
}