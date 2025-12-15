import { z } from 'zod';

export const createPermissionBodySchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required")
}).required();

export const updatePermissionBodySchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required")
}).required();

export const getPermissionByIdParamsSchema = z.object({
    id: z.string().min(1, "Permission id is required")
}).required();

export type CreatePermissionDto = z.infer<typeof createPermissionBodySchema>;
export type UpdatePermissionDto = z.infer<typeof updatePermissionBodySchema>;
export type GetPermissionByIdParamsDto = z.infer<typeof getPermissionByIdParamsSchema>;

