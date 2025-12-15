import { AppTypes, UserTypes } from 'src/constants/constants';
import { z } from 'zod';

export const createIdentityBodySchema = z.object({
    appType: z.enum(Object.values(AppTypes)),
    appVersion: z.number().min(0).default(1),
    macId: z.string().min(1)
}).required();

export const generateGuestTokenSchema = z.object({
    identityId: z.string().min(1, "identityId is required")
}).required()

export const loginSchema = z.object({
    phone: z.string().min(1, "phone is required"),
    password: z.string().min(1, "password is required")
}).required();

export const createUserSchema = z.object({
    name: z.string().min(1, "name is required"),
    phone: z.string().min(10, "phone must be at least 10 characters"),
    password: z.string().min(6, "password must be at least 6 characters"),
    userType: z.enum(Object.values(UserTypes) as [string, ...string[]]),
    email: z.string().email().optional(),
    autoDialerId: z.string().optional(),
    roles: z.array(z.string()).optional()
}).required();


export type LoginDto = z.infer<typeof loginSchema>;
export type CreateIdentityDto = z.infer<typeof createIdentityBodySchema>;
export type GenerateGuestTokenDto = z.infer<typeof generateGuestTokenSchema>;
export type CreateUserDto = z.infer<typeof createUserSchema>;