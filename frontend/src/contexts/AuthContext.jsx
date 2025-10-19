import React, { useState } from "react";
import { AuthContext } from "../utils/auth-utils";
import axios from "axios"; 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_BACKEND_API;

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}api/user/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );
      setUser(response.data.user);
      setErrorMessage("");
      return true;
    } catch (error) {
      const errMessage =
        error.response.data?.message ||
        "Login failed. Please check your credentials.";
      setErrorMessage(errMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${apiUrl}api/user/logout`);
      setUser(null);
    } catch (error) {
      console.error("Logout Failed: ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, errorMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
};
