import { showErrorModal } from "../components/Modal";

const errorMessages = {
  401: "Votre session a expiré. Veuillez vous reconnectez.",
  403: "Cette action n'est pas autorisée",
  404: "Ressource introuvable", 
};

export const handleHttpError = (error) => {
  if (error?.response?.status === 401) {
    showErrorModal({ message: errorMessages["401"] });
  } else if (error?.response?.status === 403) {
    showErrorModal({ message: errorMessages["403"] });
  } else if (error?.response?.status === 404) {
    showErrorModal({ message: errorMessages["404"] });
  
  } else if (error?.response.status === 400) {
    let serverResponse;
  
    if (Array.isArray(error.response?.data)) {
      serverResponse = error.response?.data.map((d) => d?.message).join(",");
      showErrorModal({ message: serverResponse });
    } else if (typeof error.response?.data) {
      showErrorModal({ message: error.response?.data?.message });
    }
  } else {
    showErrorModal({});
  }
  return error;
};
