import { RegistrationData } from "../types/auth";
import axiosInstance from "./api";

// Login
export const loginSerrvice = async (
  email: string,
  password: string,
  role: string
) => {
  try {
    const response = await axiosInstance.post("/auths/login", {
      email,
      password,
      role,
    });
    return response.data; // This will contain the token and other info
  } catch (error: any) {
    console.log(error);
    throw (
      error?.response?.data?.errors ||
      error.response?.data?.message ||
      "Login failed"
    );
  }
};

// Register
export const registerSerrvice = async (data: RegistrationData) => {
  try {
    await axiosInstance.post("/auths/register", data);
  } catch (error: any) {
    throw (
      error?.response?.data?.errors ||
      error.response?.data?.message ||
      "Registration failed"
    );
  }
};

// Verify Email
export const verifyEmailSerrvice = async (email: string, code: string) => {
  try {
    const response = await axiosInstance.post("/auths/verify", { email, code });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.errors ||
        error.response?.data?.message ||
        "Email verification failed"
    );
  }
};

// Send Verification Code
export const sendVerificationCodeSerrvice = async (email: string) => {
  try {
    const response = await axiosInstance.post("/auths/send-verification-code", {
      email,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.errors ||
        error.response?.data?.message ||
        "Failed to send verification code"
    );
  }
};

// Request Forgot Password Code
export const requestForgotPasswordCodeSerrvice = async (email: string) => {
  try {
    const response = await axiosInstance.post("/auths/forgot-password", {
      email,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.errors ||
        error.response?.data?.message ||
        "Failed to request password reset code"
    );
  }
};

// Verify Password Code (Reset Password)
export const resetForgotPasswordCodeSerrvice = async (
  email: string,
  code: string,
  newPassword: string
) => {
  try {
    const response = await axiosInstance.post("/auths/verify-password-code", {
      email,
      code,
      newPassword,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.errors ||
        error.response?.data?.message ||
        "Failed to reset password"
    );
  }
};
