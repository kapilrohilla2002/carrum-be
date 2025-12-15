import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { isActiveType } from "src/constants/constants";

@Schema({ timestamps: true })
export class UserContacts {
    @Prop({
        required: true,
        nullable: true,
    })
    phoneNo: string;

    @Prop({
        required: true,
        nullable: true,
    })
    email: string;

    @Prop({
        required: true,
        nullable: true,
    })
    isEmailVerified: boolean;

    @Prop({
        required: true,
        nullable: true,
    })
    isPhoneVerified: boolean;

    @Prop({
        required: true,
        nullable: true,
    })
    isPrimary: boolean;

    @Prop({
        required: true,
        nullable: false,
        default: isActiveType.ACTIVE
    })
    isActive: boolean

}

export const UserContactsSchema = SchemaFactory.createForClass(UserContacts);
export type UserContactsDocument = HydratedDocument<UserContacts>;