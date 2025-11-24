"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

// Define types for the auth context
interface User {
  id: string;
  email: string;
}

interface Session {
  user: User;
  expiresAt: number;
}

interface AuthError {
  message: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null }>;
  signUp: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType>({
  user: { id: "1", email: "demo@omnis.com" },
  session: { user: { id: "1", email: "demo@omnis.com" }, expiresAt: Date.now() + 1000000000 },
  isLoading: false,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
  resetPassword: async () => ({ error: null }),
});

// Default user for no-auth mode
const DEFAULT_USER = {
  id: "1",
  email: "demo@omnis.com",
};

// Create the auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(DEFAULT_USER);
  const [session, setSession] = useState<Session | null>({
    user: DEFAULT_USER,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000 * 365, // 1 year
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Sign in stub
  const signIn = async (email: string, password: string) => {
    return { error: null };
  };

  // Sign up stub
  const signUp = async (email: string, password: string) => {
    return { error: null };
  };

  // Sign out stub
  const signOut = async () => {
    // No-op in no-auth mode
    router.push("/");
  };

  // Reset password stub
  const resetPassword = async (email: string) => {
    return { error: null };
  };

  // The value to be provided to consuming components
  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
