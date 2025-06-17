import React, { createContext, useState, useContext } from 'react';
import { fakeAuth } from '../utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(fakeAuth.isAuthorized);

  const login = (cb) => {
    fakeAuth.login(() => {
      setIsAuthorized(true);
      cb();
    });
  };

  const logout = (cb) => {
    fakeAuth.logout(() => {
      setIsAuthorized(false);
      cb();
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
