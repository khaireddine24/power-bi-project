import {z} from "zod";

export const registerSchema=z.object({
    name:z.string().min(2,'User name contain at least 2 caracters'),
    email:z.string().email('Invalid email'),
    password:z.string().min(6,'Password contain at least 6 caracters'),
    confirmPassword:z.string()
}).refine(data=>data.password===data.confirmPassword,{
    message:'Password dont match',
    path:['confirmPassword']
});

export const loginSchema=z.object({
    email:z.string().email('Invalid email'),
    password:z.string().min(1,'password required')
});

export const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
  });
  
export const otpVerificationSchema = z.object({
    otp: z.string().min(1, 'OTP is required'),
});
  
export const resetPasswordSchema = z.object({
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password is required'),
  }).refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const updateProfileSchema = z.object({
    name: z.string().min(2, 'Name must contain at least 2 characters').optional(),
    email: z.string().email('Invalid email').optional(),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmNewPassword: z.string().optional()
  }).refine(data => {
    if (data.currentPassword && !data.newPassword) {
      return false;
    }
    return true;
  }, {
    message: 'New password is required when current password is provided',
    path: ['newPassword']
  }).refine(data => {
    if (data.newPassword && data.newPassword !== data.confirmNewPassword) {
      return false;
    }
    return true;
  }, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword']
  });
  
  
  export type RegisterFormData=z.infer<typeof registerSchema>;
  export type LoginFormData=z.infer<typeof loginSchema>;
  export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
  export type OtpVerificationFormData = z.infer<typeof otpVerificationSchema>;
  export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
  export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;