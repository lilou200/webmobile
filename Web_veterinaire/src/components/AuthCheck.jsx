import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const AuthCheck = ({children}) => {
  const { isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" /> 
}
  return children;
};

