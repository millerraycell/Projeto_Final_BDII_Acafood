import axios from "axios";

const neoApi = axios.create({
  baseURL: "http://localhost:3002",
});

export default neoApi;