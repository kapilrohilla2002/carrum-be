import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DriverService } from './services/driver.service';
import { ROLES } from 'src/constants/constants';

@Controller('/api/v1/drivers')
export class DriverController {
    constructor(private readonly driverService: DriverService) { }

    @Get("/")
    async getDrivers(): Promise<any> {
        const role = ROLES.HUB_MANAGER;
        const hubId = '123';
        const data = await this.driverService.getDriverListByRole(role, hubId)
        return { message: 'Drivers fetched successfully', data };
    }

    @Post("/")
    createDriver() {
        return { message: 'Driver created successfully' };
    }

    @Get("/:id")
    getDriverById(@Param("id") id: string) {
        // return this.driverService.getDriverById(id);
    }

    @Put("/:id")
    updateDriver(@Param("id") id: string, @Body() driver: any) {
        //     return this.driverService.updateDriver(id, driver);
    }

    @Delete("/:id")
    deleteDriver(@Param("id") id: string) {
        // return this.driverService.deleteDriver(id);
    }
}
