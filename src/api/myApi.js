import axios from "axios";

const axiosHelper = axios.create({
    baseURL: "http://localhost:8920",
    // baseURL: "https://be-mymusic.onrender.com",
    headers: {
        "content-type": "application/json",
    },
})

export default axiosHelper;