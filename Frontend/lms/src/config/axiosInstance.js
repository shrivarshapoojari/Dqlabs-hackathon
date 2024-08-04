import axios from "axios"
const BASE_URL="http://localhost:5000/api"

 const axiosInstance=axios.create()
axiosInstance.defaults.baseURL=BASE_URL;
axiosInstance.defaults.withCredentials=true
axiosInstance.defaults.timeout=3500000;


 export default axiosInstance;