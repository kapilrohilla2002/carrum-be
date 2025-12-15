import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { isActiveType, UserTypes } from "src/constants/constants";
import { UserStatus } from "../constants/constants";
import { HydratedDocument, Types } from "mongoose";
import { UserContactsDocument } from "./userContacts";

@Schema({ timestamps: true })
export class Users {
    @Prop({
        required: true,
        nullable: true,
    })
    name: string;
    @Prop({
        required: true,
        nullable: true,
        enum: Object.values(UserTypes)
    })
    userType: string;
    @Prop({
        required: true,
        nullable: true,
        enum: Object.values(UserStatus)
    })
    status: string;
    @Prop({
        required: true,
        nullable: true,
    })
    passwordHash: string;
    @Prop({
        required: true,
        nullable: true,
    })
    autoDialerId: string;

    @Prop({
        required: true,
        nullable: true,
    })
    roles: string[];

    @Prop({
        required: true,
        nullable: true,
    })
    lastLoginIdentity: Types.ObjectId;

    @Prop({
        required: true,
        nullable: false,
        default: isActiveType.ACTIVE
    })
    isActive: boolean

    @Prop({
        required: true,
        nullable: false
    })
    userContacts: UserContactsDocument[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
export type UsersDocument = HydratedDocument<Users>;