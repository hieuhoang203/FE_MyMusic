import axios from "axios";

const axiosHelper = axios.create({
    baseURL: "http://localhost:8903",
    headers: {
        "content-type": "application/json"
    },
})

export default axiosHelper;