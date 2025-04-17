import { z } from "zod";

export const adminCreateUserSchema = z.object({
  name: z.string().min(2, 'User name must contain at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must contain at least 6 characters'),
});

export const adminUpdateUserSchema = z.object({
  name: z.string().min(2, 'User name must contain at least 2 characters').optional(),
  email: z.string().email('Invalid email').optional(),
  password: z.string().min(6, 'Password must contain at least 6 characters').optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});

export type AdminCreateUserFormData = z.infer<typeof adminCreateUserSchema>;
export type AdminUpdateUserFormData = z.infer<typeof adminUpdateUserSchema>;