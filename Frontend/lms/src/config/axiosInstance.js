import axios from "axios"
const BASE_URL="https://graminshakti.onrender.com/api"

 const axiosInstance=axios.create()
axiosInstance.defaults.baseURL=BASE_URL;
axiosInstance.defaults.withCredentials=true
axiosInstance.defaults.timeout=3500000;


 export default axiosInstance;