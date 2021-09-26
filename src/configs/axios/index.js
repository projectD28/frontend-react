import axios from "axios";
import errorHandler from "./errorHandler";

const instance = axios.create({
  //   baseURL: `${process.env.REACT_APP_API_LOCAL}`,
  baseURL: `${process.env.REACT_APP_API_HOST}`,
  // baseURL: "https://api.bwamicro.com"
});

instance.interceptors.response.use((response) => response.data, errorHandler);

export { default as setAuthorizatioanHeader } from "./setAuthorizationHeader";

export default instance;
