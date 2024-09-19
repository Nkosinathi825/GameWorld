import React, { createContext, useState, useEffect } from 'react';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    name: null,
    token: null,
  });

  const loginUser = (id, name, token) => {
    setUser({ id, name, token });
    localStorage.setItem('user', JSON.stringify({ id, name, token }));
  };


  const logoutUser = () => {
    setUser({ id: null, name: null, token: null });
    localStorage.removeItem('user'); 
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
