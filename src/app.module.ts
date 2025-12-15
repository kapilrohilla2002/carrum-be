import { Controller, Get, Module } from '@nestjs/common';
import { ConfigsModule } from './configs/configs.module';
import { DriverModule } from './modules/drivers/driver.module';
import { AuthModule } from './modules/auth/auth.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { InfraModule } from './infra/infra.module';

@Controller("health")
export class HealthController {
  @Get()
  getHealth() {
    return { message: 'OK' };
  }
}

@Module({
  imports: [
    ConfigsModule,
    InfraModule,
    DriverModule,
    AuthModule,
    VehiclesModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule { }
