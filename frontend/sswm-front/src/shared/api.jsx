import axios from 'axios';
import url from "./url";

const api = axios.create({
  baseURL: url.BASE_URL,
});

export default api;