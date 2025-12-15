import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { Driver, DriverSchema } from './schema/driver';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverService } from './services/driver.service';
import { DriverRepository } from './repositories/driver.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Driver.name, schema: DriverSchema }
        ]),
    ],
    controllers: [DriverController],
    providers: [DriverService, DriverRepository],
    exports: []
})
export class DriverModule { }
