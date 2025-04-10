import axiosHelper from "../api/myApi";

export const saveAccount = (account) => {
    return axiosHelper.post(`/api/auth/register`, account)
}

export const getAccount = (account) => {
    return axiosHelper.post(`/api/auth/login`, account, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': ''
        }
    })
}

export const getUserWhenLogin = (login) => {
    return axiosHelper.get(`/api/auth/get-account-by-user-name?login=${login}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': ''
        }
    })
}