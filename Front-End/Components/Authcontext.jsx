import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap the app and provide context values
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));  // Retrieve the token from localStorage if available

  // Login function to set token and update the context
  const login = (token) => {
    setAuthToken(token);  // Update the context with the token
    localStorage.setItem('authToken', token);  // Store token in localStorage
  };

  // Logout function to remove token and reset context
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');  // Remove the token from localStorage
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
