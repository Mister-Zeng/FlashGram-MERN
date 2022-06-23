import axios from 'axios';

const api = axios.create({ baseURL: "http://localhost:5000" });

api.interceptors.request.use((req) => {
    if (localStorage.getItem("user")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`;
    }

    return req;
});

export default api;