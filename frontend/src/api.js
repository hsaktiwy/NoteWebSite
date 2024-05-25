import axios from 'axios'
import { ACCESS_TOKEN } from './constants'

const apiUrl = "/choreo-apis/djangoreactproject/backend/v1"
const ola = axios.create(
    {
        baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
    }
);

ola.interceptors.request.use(
    (config) =>
    {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token)
            config.headers.Authorization =`Bearer ${token}`
        return config
    },
    (error) =>
    {
        return Promise.reject(error)
    }
)

export default ola