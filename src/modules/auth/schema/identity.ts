import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types, Schema as MongooseSchema } from "mongoose";
import { AppTypes } from "src/constants/constants";

export type IdentityDocument = HydratedDocument<Identity>;

@Schema({ timestamps: true })
export class Identity {
    @Prop({
        required: true,
        nullable: true,
        enum: Object.values(AppTypes)
    })
    appType: string

    @Prop({
        required: true,
        nullable: true,
    })
    appVersion: number


    @Prop({
        required: true,
        nullable: false
    })
    macId: string

    @Prop({
        required: true,
        nullable: true,
    })
    userAgent: string

    @Prop({
        required: false,
        nullable: true,
        ref: 'users',
        type: Types.ObjectId
    })
    lastLoginUserId: Types.ObjectId | null

    @Prop({
        required: false,
        nullable: true,
        type: MongooseSchema.Types.String
    })
    guestToken: string | null;

    @Prop({
        required: false,
        nullable: true,
        type: MongooseSchema.Types.String
    })
    accessToken: string | null;

    @Prop({
        required: false,
        nullable: true,
        type: MongooseSchema.Types.String
    })
    refreshToken: string | null;
}

export const IdentitySchema = SchemaFactory.createForClass(Identity);