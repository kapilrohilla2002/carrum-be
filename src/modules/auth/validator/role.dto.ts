import { z } from 'zod';

export const createRoleBodySchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required")
}).required();

export const updateRoleBodySchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required")
}).required();

export const getRoleByIdParamsSchema = z.object({
    id: z.string().min(1, "Role id is required")
}).required();

export type CreateRoleDto = z.infer<typeof createRoleBodySchema>;
export type UpdateRoleDto = z.infer<typeof updateRoleBodySchema>;
export type GetRoleByIdParamsDto = z.infer<typeof getRoleByIdParamsSchema>;

