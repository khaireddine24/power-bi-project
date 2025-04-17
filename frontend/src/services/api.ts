import axios from 'axios'
import { ForgotPasswordFormData, LoginFormData, RegisterFormData } from '@/schemas/authSchemas';

const API_URL=import.meta.env.API_URL || 'http://localhost:3000/api'

const api=axios.create({
    baseURL:API_URL,
    withCredentials:true
});


export const registerUser=async(userData:RegisterFormData)=>{
    const response=await api.post('/users/create-user',userData);
    return response.data;
}

export const loginUser=async(userData:LoginFormData)=>{
    const response=await api.post('/auth/login',userData);
    return response.data;
}

export const logoutUser=async()=>{
    const response=await api.post('/auth/logout');
    return response.data;
}

export const getCurrentUser=async()=>{
    const response=await api.get('/auth/profile');
    return response.data;
}

export const updateUserProfile = async (userData: {
    name?: string;
    email?: string;
    currentPassword?: string;
    newPassword?: string;
  }) => {
    try {
      const response = await api.put('/auth/update-profile', userData);
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

export const requestPasswordReset = async (email: ForgotPasswordFormData) => {
    const response = await api.post('/auth/forgot-password', email);
    return response.data;
  };
  
  export const verifyOTP = async (data: { email: string, otp: string }) => {
    const response = await api.post('/auth/verify-otp', data);
    return response.data;
  };
  
  export const resetPassword = async (data: { resetId: string, newPassword: string }) => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  };

  export const getAllUsers = async () => {
    const response = await api.get('/users/get-all-users');
    return response.data;
  };
  
  export const getUserById = async (id: number) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  };
  
  export const createUser = async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    const response = await api.post('/users/create-user', userData);
    return response.data;
  };
  
  export const updateUser = async (id: number, userData: {
    name?: string;
    email?: string;
    password?: string;
  }) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  };
  
  export const deleteUser = async (id: number) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  };

