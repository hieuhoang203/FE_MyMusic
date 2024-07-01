import axiosHelper from "../api/myApi";

const config = {
    headers: {
        "Content-Type": "multipart/form-data",
    },
};

export const getAllUser = (page) => {
    return axiosHelper.get(`/user/admin/get-all-user?page=${page}`);
}

export const getUserByStatus = (status, page) => {
    return axiosHelper.get(`/user/admin/get-all-user/${status}`, page);
}

export const getAllArtis = (page) => {
    return axiosHelper.get(`/user/admin/get-all-artis?page=${page}`);
}

export const getArtisByStatus = (status, page) => {
    return axiosHelper.get(`/user/admin/get-all-artis/${status}`, page);
}

export const getNewUserOrArtis = (role) => {
    return axiosHelper.get(`/user/admin/new-user/${role}`);
}

export const saveUser = (user) => {
    return axiosHelper.post(`/user/admin/save`, user, config);
}

export const searchUser = (id) => {
    return axiosHelper.get(`/user/admin/search/${id}`);
}

export const updateStatusUser = (id, account, status) => {
    return axiosHelper.get(`/user/admin/update-status?id=${id}&account=${account}&status=${status}`)
}

export const updateUser = (id, user) => {
    return axiosHelper.put(`/user/admin/update/${id}`, user, config);
}

export const getArtisSelect = () => {
    return axiosHelper.get(`/user/admin/get-artis-select`);
}