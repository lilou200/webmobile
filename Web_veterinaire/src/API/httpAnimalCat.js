import httpService from "./http";

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/animalcategory`;

export const fetchAnimalCategories = (pagenb) => {
  return httpService.get(`${baseURL}/all/${pagenb}`);
};


export const searchAnimalCategoryByLabel = (label_fr) => {
  return httpService.get(`${baseURL}/${label_fr}`);
};



//export const filterAnimalCategoryByLabelFr = (label) => httpService.get(`${baseURL}/label-fr/${encodeURIComponent(label)}`);

export const filterAnimalCategoryByLabelEn = (label) => httpService.get(`${baseURL}/label-en/${label}`);

export const addAnimalCategory = (animalCategoryData) => httpService.post(baseURL, animalCategoryData);

export const updateAnimalCategory = (animalCategoryData) => httpService.patch(baseURL, animalCategoryData);

export const deleteAnimalCategory = (label_fr) => httpService.delete(`${baseURL}/${label_fr}`);

export const getCategoryCount = () => httpService.get(`${baseURL}/count`);
