import React, { createContext, useState, useContext } from "react";
import { getUserService } from "../services/user";
import { User } from "../types/user";

interface UserContextType {
  user: User | null;
  getUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    try {
      const userData = await getUserService();
      setUser(userData.user);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const logout = async () => {
    setUser(null);
  };
  return (
    <UserContext.Provider
      value={{
        user,
        getUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
};
