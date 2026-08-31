import axios from 'axios';

const api = axios.create({
    baseURL : 'https://resume-analyzer-5p0e.onrender.com',
});

export default api;