import httpService from "./http";

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/availability`;

export const fetchAvailabilities = (pagenb) => {
  return httpService.get(`${baseURL}/all/${pagenb}`);
};

export const addAvailability = (availabilityData) => {
  return httpService.post(baseURL, availabilityData);
};

export const updateAvailability = (availabilityData) => {
  return httpService.patch(baseURL, availabilityData);
};

export const deleteAvailability = (idVete, idOnCall) => {
  return httpService.delete(`${baseURL}/${idVete}/${idOnCall}`);
};

export const searchAvailabilityByDate = (date) => {
  return httpService.get(`${baseURL}/bydate/${date}`);
};

export const searchAvailabilityByVeterinarian = (idVete) => {
  return httpService.get(`${baseURL}/byveterinarian/${idVete}`);
};

export const getAvailabilityCount = () => {
  return httpService.get(`${baseURL}/count`);
};
