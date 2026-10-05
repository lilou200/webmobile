import httpService from "./http";

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/veterinarian`;

export const fetchVeterinarians = (pagenb) => {
  return httpService.get(`${baseURL}/all/${pagenb}`);
};

export const fetchVeterinarianByLastName = (lastname) => {
  return httpService.get(`${baseURL}/lastname/${lastname}`);
};

export const fetchVeterinarianByLocality = (localityClinic) => {
  return httpService.get(`${baseURL}/locality/${localityClinic}`);
};

export const addVeterinarian = (veterinarianData) => {
  return httpService.post(`${baseURL}/withavailability`, veterinarianData);
};

export const updateVeterinarian = (veterinarianData) => {
  return httpService.patch(baseURL, veterinarianData);
};

export const deleteVeterinarian = (id) => {
  return httpService.delete(`${baseURL}/${id}`);
};

export const addVeterinarianWithAvailability = (veterinarianData, availabilityData) => {
  return httpService.post(`${baseURL}/withavailability`, {
    veterinarian: veterinarianData,
    availability: availabilityData,
  });
};

export const getVetCount = () => httpService.get(`${baseURL}/count`);
