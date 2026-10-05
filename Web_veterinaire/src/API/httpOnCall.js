import httpService from "./http";

const baseURL = import.meta.env.VITE_API_BASE_URL + "/oncall";

export const fetchOnCalls = (pagenb) => {

  return httpService.get(`${baseURL}/all/${pagenb}`);
};

export const searchOnCallByDate = (date) => httpService.get(`${baseURL}/date/${date}`);

export const addOnCall = (onCallData) => httpService.post(baseURL, onCallData);

export const getOnCallCount = () => httpService.get(`${baseURL}/count`);
