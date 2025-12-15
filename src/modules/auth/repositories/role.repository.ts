import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Roles } from "../schema/roles";
import { Model } from "mongoose";
import PermissionService from "../services/permission.service";
import { PermissionDocument } from "../schema/permission";

@Injectable()
export class RoleRepository {
    constructor(@InjectModel(Roles.name) private readonly roleModel: Model<Roles>, private readonly permissionService: PermissionService) { }

    async createRole(role: createRoleParams) {
        let permissions: PermissionDocument[] = [] as PermissionDocument[];
        if (role.permissions) {
            const permissionIds = role.permissions;
            permissions = await this.permissionService.getPermissionsByIds(permissionIds)
        }
        const newRole = await this.roleModel.create({
            ...role,
            permissions: permissions
        });

        return newRole;
    }

    getAllRoles() {
        return this.roleModel.find().exec();
    }

    getRoleById(id: string) {
        return this.roleModel.findById(id).exec();
    }

    updateRole(id: string, role: Partial<Roles>) {
        return this.roleModel.findByIdAndUpdate(id, role, { new: true }).exec();
    }

    getRolesCount() {
        return this.roleModel.countDocuments().exec();
    }
}

type createRoleParams = {
    name: string;
    description: string;
    permissions: string[];
}