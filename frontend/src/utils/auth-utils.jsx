import React, { createContext, useContext } from "react";
import axios from "axios";

// Configure axios outside the component file
axios.defaults.withCredentials = true;

// Export the Context and the custom hook
export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};
