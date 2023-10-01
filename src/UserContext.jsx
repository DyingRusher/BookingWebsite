import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const userContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
        setReady(true);
      }); // for getting user info
      // setUser(data)
    }
  }, []);
  return (
    <userContext.Provider value={{ user, setUser, ready, setReady }}>
      {children}
    </userContext.Provider>
  );
}
