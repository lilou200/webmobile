import axios from "axios";
import axiosRetry from "axios-retry";
import { handleHttpError } from "./errorHandler.js";

axiosRetry(axios, {
  retries: 1,
  retryDelay: axiosRetry.exponentialDelay,
});

axios.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("projectVetToken");
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

/*
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
*/

const httpService = {
  async get(url) {
    const response = await axios.get(url).catch(handleHttpError);
    return response.data;
  },

  async post(url, data) {
    const response = await axios.post(url, data).catch(handleHttpError);
    return response.data;
  },

  async patch(url, data) {
    const response = await axios.patch(url, data).catch(handleHttpError);
    return response.data;
  },

  async delete(url) {
    const response = await axios.delete(url).catch(handleHttpError);
    return response.data;
  },
};

export default httpService;


