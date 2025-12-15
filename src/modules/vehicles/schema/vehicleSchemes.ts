import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export const EngineType = {
    PETROL: 'PETROL',
    DIESEL: 'DIESEL',
    EV: 'EV',
    HYBRID: 'HYBRID'
} as const;

@Schema()
export class VehicleType {
    @Prop({
        required: true,
        nullable: false,
    })
    companyName: string;

    @Prop({
        required: true,
        nullable: false,
    })
    model: string;

    @Prop({
        required: true,
        nullable: false,
    })
    variant: string;

    @Prop({
        required: true,
        nullable: false,
        enum: Object.values(EngineType)
    })
    engineType: string;

}

@Schema({ timestamps: true })
export class TpwCharges {
    @Prop({
        required: false,
        nullable: true
    })
    maxTrips: number;

    @Prop({
        required: false,
        nullable: true
    })
    minTrips: number;

    @Prop({
        required: false,
        nullable: true
    })
    dialyCarRent: number;

    @Prop({
        required: false,
        nullable: true
    })
    incentive: number;

    @Prop({
        required: false,
        nullable: true
    })
    minCarCount: number;

    @Prop({
        required: false,
        nullable: true
    })
    maxCarCount: number;
}

@Schema({ timestamps: true })
export class VehicleScheme {
    @Prop({
        required: true,
        nullable: false,
    })
    displayName: string;

    @Prop({
        required: true,
        nullable: false,
        ref: 'hubs'
    })
    hubId: string;

    @Prop({
        required: true,
        nullable: false,
    })
    version: number;

    @Prop({
        required: false,
        nullable: true
    })
    securityDepositAmount: number;

    @Prop({
        required: false,
        nullable: true
    })
    processingFee: number;

    @Prop({
        required: false,
        nullable: true
    })
    vehicleType: VehicleType;

    @Prop({
        required: false,
        nullable: true
    })
    vehicleTypes: VehicleType[];

    @Prop({
        required: false,
        nullable: true
    })
    tpwCharges: TpwCharges;
}

export const TpwChargesSchema = SchemaFactory.createForClass(TpwCharges);
export type TpwChargesDocument = HydratedDocument<TpwCharges>;

export const VehicleSchemeSchema = SchemaFactory.createForClass(VehicleScheme);
export type VehicleSchemeDocument = HydratedDocument<VehicleScheme>;

export const VehicleTypeSchema = SchemaFactory.createForClass(VehicleType);
export type VehicleTypeDocument = HydratedDocument<VehicleType>;