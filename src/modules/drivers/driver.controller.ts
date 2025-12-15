import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { DriverService } from './services/driver.service';
import { ROLES } from 'src/constants/constants';
import { AccessAuthenticationGuard } from 'src/common/guard/authentication.guard';
import { AuthorizationGuard } from 'src/common/guard/authorization.guard';
import { Types } from 'mongoose';

@Controller('/api/v1/drivers')
@UseGuards(AccessAuthenticationGuard)
export class DriverController {
    constructor(private readonly driverService: DriverService) { }

    @Get("/")
    @UseGuards(new AuthorizationGuard([ROLES.HUB_MANAGER]))
    async getDrivers(@Query('hubId') hubId: string, @Req() request: any): Promise<any> {
        // Get hubId from query param or use from user context if available
        const finalHubId = hubId || request.user?.hubId;
        if (!finalHubId) {
            throw new HttpException("hubId is required", HttpStatus.BAD_REQUEST);
        }

        // Get user's role (should be HUB_MANAGER based on guard)
        const userRoles = request.user.roles || [];
        const role = userRoles.find((r: string) => r === ROLES.HUB_MANAGER) || ROLES.HUB_MANAGER;

        const data = await this.driverService.getDriverListByRole(role, finalHubId);
        return { message: 'Drivers fetched successfully', data };
    }

    @Post("/")
    @UseGuards(new AuthorizationGuard([ROLES.HUB_MANAGER]))
    async createDriver(@Body() body: any, @Req() request: any): Promise<any> {
        const { userId, hubId, fileUploadId, schemeId, parentDriverId } = body;

        if (!userId || !hubId || !fileUploadId) {
            throw new HttpException("userId, hubId, and fileUploadId are required", HttpStatus.BAD_REQUEST);
        }

        if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(hubId) || !Types.ObjectId.isValid(fileUploadId)) {
            throw new HttpException("Invalid ObjectId format", HttpStatus.BAD_REQUEST);
        }

        const createdBy = request.user.userId;
        const driver = await this.driverService.createDriver({
            userId,
            hubId,
            createdBy,
            fileUploadId,
            schemeId,
            parentDriverId
        });

        return { message: 'Driver created successfully', data: driver };
    }

    @Get("/:id")
    @UseGuards(new AuthorizationGuard([ROLES.HUB_MANAGER]))
    async getDriverById(@Param("id") id: string): Promise<any> {
        const driver = await this.driverService.getDriverById(id);
        return { message: 'Driver fetched successfully', data: driver };
    }

    @Put("/:id")
    @UseGuards(new AuthorizationGuard([ROLES.HUB_MANAGER]))
    async updateDriver(@Param("id") id: string, @Body() driver: any): Promise<any> {
        const updatedDriver = await this.driverService.updateDriver(id, driver);
        return { message: 'Driver updated successfully', data: updatedDriver };
    }

    @Delete("/:id")
    deleteDriver(@Param("id") id: string) {
        // return this.driverService.deleteDriver(id);
    }
}
