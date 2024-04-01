import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const storedUserEmail = localStorage.getItem("userEmail");
  const [userEmail, setUserEmail] = useState(storedUserEmail || "");

  // Update local storage when userEmail changes
  useEffect(() => {
    localStorage.setItem("userEmail", userEmail);
  }, [userEmail]);

  return (
    <UserContext.Provider value={{ userEmail, setUserEmail }}>
      {children}
    </UserContext.Provider>
  );
}
