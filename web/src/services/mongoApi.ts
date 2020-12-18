import axios from "axios";

const mongoApi = axios.create({
  baseURL: "http://localhost:3003",
});

export default mongoApi;