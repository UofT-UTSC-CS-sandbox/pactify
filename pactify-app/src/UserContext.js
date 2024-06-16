// UserContext.js
import React, { createContext, useState , useEffect} from 'react';
import axios from 'axios';


export const UserContext = createContext();
axios.defaults.withCredentials = true;
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5050/home'); 
        setUser(response.data.user);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
