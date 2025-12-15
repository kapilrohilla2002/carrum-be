import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { VehicleScheme, VehicleSchemeSchema } from "./schema/vehicleSchemes";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: VehicleScheme.name, schema: VehicleSchemeSchema }
        ]),
    ],
    controllers: [],
    providers: [],
    exports: []
})

export class VehiclesModule { }