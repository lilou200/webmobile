
import httpService from "./http";

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/care`;

export const fetchCares = (pagenb) => {
  return httpService.get(`${baseURL}/all/${pagenb}`);
};

export const filterCaresByAnimalCategory = (animalCategory, pagenb) => {
  return httpService.get(`${baseURL}/animalCategory/${animalCategory}/${pagenb}`);
};

export const addCare = (careData) => {
  return httpService.post(baseURL, careData);
};

export const updateCare = (careData) => {
  return httpService.patch(baseURL, careData);
};

export const deleteCare = (idvete, animalCategory) => {
  return httpService.delete(`${baseURL}/${idvete}/${animalCategory}`);
};

export const searchCaresByVeterinarian = (veterinarian) => {
  return httpService.get(`${baseURL}/veterinarian/${veterinarian}`);
};

export const getCareCount = () => httpService.get(`${baseURL}/count`);

