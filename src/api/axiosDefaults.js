import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

// Grab the token from localStorage and attach it to every request
const token = localStorage.getItem("token");
console.log(token)
if (token) {
  api.defaults.headers.common["Authorization"] = `Token ${token}`;
}

export default api;