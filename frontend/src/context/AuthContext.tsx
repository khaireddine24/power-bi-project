/* eslint-disable @typescript-eslint/no-explicit-any */ 
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { AuthState, User } from "@/types/auth.types";
import { LoginFormData } from "@/schemas/authSchemas";
import { getCurrentUser, loginUser, logoutUser, updateUserProfile } from "@/services/api";

interface AuthContextType extends AuthState {
  login: (data: LoginFormData) => Promise<User | null>;
  logout: () => Promise<void>;
  updateProfile: (userData: {
    name?: string;
    email?: string;
    currentPassword?: string;
    newPassword?: string;
  }) => Promise<User>;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getCurrentUser();
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error:any) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    };
    loadUser();
  }, []);

  const login = async (data: LoginFormData): Promise<User | null> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      const user = await loginUser(data);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return user;
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error.response?.data?.message || 'An error occurred'
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        error: error.response?.data?.message || 'Internal server error'
      }));
      throw error;
    }
  };

  const updateProfile = async (userData: {
    name?: string;
    email?: string;
    currentPassword?: string;
    newPassword?: string;
  }) => {
    try {
      const updatedUser = await updateUserProfile(userData);
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
      }));
      return updatedUser;
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        error: error.response?.data?.message || 'Failed to update profile'
      }));
      throw error;
    }
  };
  const refetchUser = async () => {
    await getCurrentUser();
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, updateProfile,refetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};