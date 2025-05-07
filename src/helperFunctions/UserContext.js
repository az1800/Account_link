import { createContext, useState } from 'react';

export const UserDataContext = createContext({
  userData: null,
  setUserData: () => {}
});

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};