import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Permission } from "../schema/permission";
import { Model, Types } from "mongoose";

@Injectable()
export class PermissionRepository {
    constructor(@InjectModel(Permission.name) private readonly permissionModel: Model<Permission>) { }

    createPermission(permission: Partial<Permission>) {
        return this.permissionModel.create(permission);
    }

    getAllPermissions() {
        return this.permissionModel.find().exec();
    }

    getPermissionById(id: string) {
        return this.permissionModel.findById(id).exec();
    }

    updatePermission(id: string, permission: Partial<Permission>) {
        return this.permissionModel.findByIdAndUpdate(id, permission, { new: true }).exec();
    }

    getPermissionsByIds(ids: string[]) {
        if (!ids.length) {
            return [];
        }
        return this.permissionModel.find({ _id: { $in: ids.map(id => new Types.ObjectId(id)) } }).exec();
    }
}

