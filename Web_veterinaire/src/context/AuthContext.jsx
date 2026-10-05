
import dayjs from "dayjs";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const login = (token, expiryTimeStamp) => {
    const expiryTime = new Date(expiryTimeStamp * 1000);
    localStorage.setItem("projectVetToken", token);
    localStorage.setItem("projectVetTokenExpiry", expiryTime);
    setToken(token);
    setSessionExpired(false);
  };

  const logout = (expired = false) => {
    localStorage.removeItem("projectVetToken");
    localStorage.removeItem("projectVetTokenExpiry");
    setToken(null);
    setSessionExpired(expired);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("projectVetToken");
    const expiry = localStorage.getItem("projectVetTokenExpiry");
    if (storedToken && expiry) {
      const now = dayjs();
      const expiresAt = dayjs(expiry);
      if (now.isBefore(expiresAt)) {
        setToken(storedToken);
      } else {
        logout(true);
      }
    }
    setIsAuthLoading(false);
  }, []);

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuthenticated,
        sessionExpired,
        isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return context;
};