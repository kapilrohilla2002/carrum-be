import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RoleRepository } from "../repositories/role.repository";
import { Roles } from "../schema/roles";
import { Types } from "mongoose";

@Injectable()
export default class RolesService {
    constructor(private readonly roleRepository: RoleRepository) { }

    async createRole(role: CreateRoleParams) {
        const newRole = await this.roleRepository.createRole({
            name: role.name,
            description: role.description,
            permissions: []
        });
        return newRole;
    }

    async getAllRoles() {
        const roles = await this.roleRepository.getAllRoles();
        const count = await this.roleRepository.getRolesCount();
        return {
            roles, count
        };
    }

    async getRoleById(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException("Invalid role id", HttpStatus.BAD_REQUEST);
        }
        const role = await this.roleRepository.getRoleById(id);
        if (!role) {
            throw new HttpException("Role not found", HttpStatus.NOT_FOUND);
        }
        return role;
    }

    async updateRole(id: string, role: UpdateRoleParams) {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException("Invalid role id", HttpStatus.BAD_REQUEST);
        }
        const existingRole = await this.roleRepository.getRoleById(id);
        if (!existingRole) {
            throw new HttpException("Role not found", HttpStatus.NOT_FOUND);
        }
        const updatedRole = await this.roleRepository.updateRole(id, {
            name: role.name,
            description: role.description
        });
        return updatedRole;
    }
}

type CreateRoleParams = {
    name: string;
    description: string;
};

type UpdateRoleParams = {
    name: string;
    description: string;
};
