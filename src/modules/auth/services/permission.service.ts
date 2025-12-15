import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PermissionRepository } from "../repositories/permission.repository";
import { Permission } from "../schema/permission";
import { Types } from "mongoose";

@Injectable()
export default class PermissionService {
    constructor(private readonly permissionRepository: PermissionRepository) { }

    async createPermission(permission: CreatePermissionParams) {
        const newPermission = await this.permissionRepository.createPermission({
            name: permission.name,
            description: permission.description
        });
        return newPermission;
    }

    async getAllPermissions() {
        const permissions = await this.permissionRepository.getAllPermissions();
        return permissions;
    }

    async getPermissionById(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException("Invalid permission id", HttpStatus.BAD_REQUEST);
        }
        const permission = await this.permissionRepository.getPermissionById(id);
        if (!permission) {
            throw new HttpException("Permission not found", HttpStatus.NOT_FOUND);
        }
        return permission;
    }

    async updatePermission(id: string, permission: UpdatePermissionParams) {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException("Invalid permission id", HttpStatus.BAD_REQUEST);
        }
        const existingPermission = await this.permissionRepository.getPermissionById(id);
        if (!existingPermission) {
            throw new HttpException("Permission not found", HttpStatus.NOT_FOUND);
        }
        const updatedPermission = await this.permissionRepository.updatePermission(id, {
            name: permission.name,
            description: permission.description
        });
        return updatedPermission;
    }

    async getPermissionsByIds(ids: string[]) {
        if (!ids.length) {
            return [];
        }
        const permissions = await this.permissionRepository.getPermissionsByIds(ids);
        if (!permissions.length) {
            throw new HttpException("Permissions not found", HttpStatus.NOT_FOUND);
        }
        return permissions;
    }
}

type CreatePermissionParams = {
    name: string;
    description: string;
};

type UpdatePermissionParams = {
    name: string;
    description: string;
};

