import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8903",
    headers: {
        "Content-Type": "application/json"
    }
})