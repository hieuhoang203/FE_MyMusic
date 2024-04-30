import httpClient from "../api/myApi";

const config = {
    headers: {
        "Content-Type": "multipart/form-data",
    },
};


export const getAllUser = (page) => {
    return httpClient.get(`/admin/user/get-all-user?page=${page}`);
}

export const getUserByStatus = (status, page) => {
    return httpClient.get(`/admin/user/get-all-user/${status}`, page);
}

export const getAllArtis = (page) => {
    return httpClient.get(`/admin/user/get-all-artis?page=${page}`);
}

export const getArtisByStatus = (status, page) => {
    return httpClient.get(`/admin/user/get-all-artis/${status}`, page);
}

export const getNewUserOrArtis = (role) => {
    return httpClient.get(`/admin/user/new-user/${role}`);
}

export const saveUser = (user) => {
    return httpClient.post(`/admin/user/save`, user, config);
}

export const searchUser = (id) => {
    return httpClient.get(`/admin/user/search/${id}`);
}

export const updateStatusUser = (id, account, status) => {
    return httpClient.get(`/admin/user/update-status?id=${id}&account=${account}&status=${status}`)
}

export const updateUser = (id, user) => {
    return httpClient.put(`/admin/user/update/${id}`, user, config);
}