import axios from "axios";

const getToken = () => localStorage.getItem("token") || "";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  header: {
    "Content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${
    getToken() ? JSON.parse(getToken()) : ""
  }`;
  return req;
});

axiosInstance.interceptors.response.use(res => res, async err => {
  if (err.response.status === 401) {
    localStorage.setItem("token", null);
    localStorage.setItem("sidebar", null);
    setTimeout( () => {
      window.location.reload();
    }, 300)
  }
  return Promise.reject(err);
})

export default axiosInstance;
