import { useDispatch } from "react-redux";
import { login, logout } from "@/store/features/user/userSlice";
import { useState } from "react";
import { SignInResponse } from "../api.types";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/sign-in`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        },
      );

      const data = (await response.json()) as SignInResponse;

      if (!response.ok) {
        throw new Error(data.message || "Authentication error");
      }

      dispatch(login(data.user));

      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "There was an error when logging in";

      setError(errorMessage);
      console.error("Error when logging in:", error);

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, username: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/sign-up`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, password }),
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Error when signing up");
      }

      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "There was an error when signing up";

      setError(errorMessage);
      console.error("Error when signing up:", error);

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/sign-out`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Error when logging out");
      }

      dispatch(logout());
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error when logging out";

      setError(errorMessage);
      console.error("Error when logging out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    signIn,
    signUp,
    signOut,
    isLoading,
    error,
    clearError,
  };
};
