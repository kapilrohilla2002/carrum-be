import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Users } from "../schema/users";
import { Model } from "mongoose";

@Injectable()
export class UserRepository {
    constructor(@InjectModel(Users.name) private readonly userModel: Model<Users>) { }

    async createUser(user: Partial<Users>) {
        return this.userModel.create(user);
    }

    async findUserByPhone(phone: string) {
        return this.userModel.findOne({
            'userContacts.phoneNo': phone,
            'userContacts.isPrimary': true,
            isActive: true
        });
    }

    async findUserById(id: string) {
        return this.userModel.findById(id);
    }

    async updateUser(id: string, user: Partial<Users>) {
        return this.userModel.findByIdAndUpdate(id, user, { new: true });
    }

    async deleteUser(id: string) {
        return this.userModel.findByIdAndDelete(id);
    }
}

