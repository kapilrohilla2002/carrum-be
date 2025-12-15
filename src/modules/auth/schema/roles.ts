import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { PermissionDocument } from "./permission";

@Schema({ timestamps: true })
export class Roles {
    @Prop({
        required: true,
        nullable: true,
    })
    name: string;
    @Prop({
        required: true,
        nullable: true,
    })
    description: string;
    @Prop({
        required: true,
        nullable: true,
    })
    permissions: PermissionDocument[];
}

export const RolesSchema = SchemaFactory.createForClass(Roles);
export type RolesDocument = HydratedDocument<Roles>;