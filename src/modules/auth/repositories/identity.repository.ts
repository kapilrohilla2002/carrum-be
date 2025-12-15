import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Identity } from "../schema/identity";
import { Model } from "mongoose";

@Injectable()
export class IdentityRepository {
    constructor(@InjectModel(Identity.name) private readonly identityModel: Model<Identity>) { }

    createIdentity(identity: Identity) {
        return this.identityModel.create(identity)
    }

    getIdentityById(id: string) {
        return this.identityModel.findById(id)
    }

    updateIdentity(id: string, identity: Partial<Identity>) {
        return this.identityModel.findByIdAndUpdate(id, identity)
    }

    deleteIdentity(id: string) {
        return this.identityModel.findByIdAndDelete(id)
    }
}