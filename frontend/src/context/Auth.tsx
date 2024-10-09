import React, { createContext, useState, useEffect, useContext } from "react";
import { getData, removeValue, storeData } from "../utils/storage";
import {
  loginSerrvice,
  registerSerrvice,
  verifyEmailSerrvice,
} from "../services/auth";
import { useUser } from "./User";
import { RegistrationData } from "../types/auth";

interface AuthContextType {
  loading: boolean;
  onboardingCompleted: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegistrationData) => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<void>;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const onboardingStatus = await getData("onboarding");
        const savedToken = await getData("token");

        if (onboardingStatus === "completed") {
          setOnboardingCompleted(true);
        }
        if (savedToken) {
          await getUser();
        }
      } catch (e) {
        console.error("Error loading auth state:", e);
      } finally {
        setLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginSerrvice(email, password);
      await storeData("token", response.token);
      getUser();
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegistrationData) => {
    try {
      await registerSerrvice(data);
    } catch (error) {
      throw error;
    }
  };

  const verifyEmail = async (email: string, code: string) => {
    try {
      await verifyEmailSerrvice(email, code);
      getUser();
    } catch (error) {
      throw error;
    }
  };

  const completeOnboarding = async () => {
    setOnboardingCompleted(true);
    await storeData("onboarding", "completed");
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        onboardingCompleted,
        login,
        register,
        verifyEmail,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
