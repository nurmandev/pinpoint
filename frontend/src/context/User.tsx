import React, { createContext, useState, useContext } from "react";
import { UserData, getUserService, updateUserService } from "../services/user";
import { User } from "../types/user";
import { removeValue } from "../utils/storage";

interface UserContextType {
  user: User | null;
  getUser: () => Promise<void>;
  updateUser: (data: UserData) => Promise<void>;
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

  const updateUser = async (data: UserData) => {
    try {
      const userData = await updateUserService(data);
      setUser(userData.user);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const logout = async () => {
    setUser(null);
    removeValue("token");
  };
  return (
    <UserContext.Provider
      value={{
        user,
        getUser,
        updateUser,
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
