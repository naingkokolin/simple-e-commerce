import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

axios.defaults.withCredentials = true;

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

    const apiUrl = import.meta.env.VITE_BACKEND_API;

  // useEffect(() => {
  //   const checkUserStatus = async () => {
  //     try {
  //       const res = await axios.get(`${apiUrl}api/user/login`);
  //       setUser(res.data.user);
  //     } catch (e) {
  //       console.log("No active session.");
  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   checkUserStatus();
  // }, []);

  const login = async ({email, password }) => {
    try {
      const response = await axios.post(`${apiUrl}api/user/login`, {email, password}, {
        withCredentials: true,
      });
      setUser(response.data.user);
      setErrorMessage("");
      return true;
    } catch (error) {
      const errMessage = error.response.data?.message || "Login failed. Please check your credentials.";
      setErrorMessage(errMessage);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${apiUrl}api/user/logout`);
      setUser(null)
    } catch (error) {
      console.error("Logout Failed: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, errorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};
