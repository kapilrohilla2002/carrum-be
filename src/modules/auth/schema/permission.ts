import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ timestamps: true })

export class Permission {
    @Prop({
        required: true,
        nullable: true,
        unique: true
    })
    name: string;
    @Prop({
        required: true,
        nullable: true,
    })
    description: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
export type PermissionDocument = HydratedDocument<Permission>;