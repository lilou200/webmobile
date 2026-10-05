import httpService from "./http";

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/user`;

export const fetchUsers = (pagenb) => {
  return httpService.get(`${baseURL}/all/${pagenb}`);
};

export const filterUsersByAdminStatus = (isadmin) => {
  return httpService.get(`${baseURL}/filteradmin/${isadmin}`);
};

export const fetchUserByUserName = (username) => {
  return httpService.get(`${baseURL}/username/${username}`);
};

export const addUser = (userData) => {
  return httpService.post(baseURL, userData);
};

export const updateUser = (userData) => {
  return httpService.patch(baseURL, userData);
};

export const deleteUser = (email) => {
  return httpService.delete(`${baseURL}/${email}`);
};
export const loginUser = (credentials) => {
  return httpService.post(`${baseURL}/login`, credentials);
};

export const getUserCount = () => httpService.get(`${baseURL}/count`);
