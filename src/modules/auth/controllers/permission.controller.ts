import { Body, Controller, Get, Param, Post, Put, UsePipes } from "@nestjs/common";
import PermissionService from "../services/permission.service";
import * as permissionDto from "../validator/permission.dto";
import ZodValidationPipe from "src/common/pipes/zodValidation.pipe";

@Controller("/auth/permissions")
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) { }

    @Post()
    @UsePipes(new ZodValidationPipe(permissionDto.createPermissionBodySchema))
    async createPermission(@Body() body: permissionDto.CreatePermissionDto) {
        const permission = await this.permissionService.createPermission({
            name: body.name,
            description: body.description
        });
        return permission;
    }

    @Get()
    async getAllPermissions() {
        const permissions = await this.permissionService.getAllPermissions();
        return permissions;
    }

    @Get("/:id")
    async getPermissionById(@Param("id") id: string) {
        const permission = await this.permissionService.getPermissionById(id);
        return permission;
    }

    @Put("/:id")
    @UsePipes(new ZodValidationPipe(permissionDto.updatePermissionBodySchema))
    async updatePermission(@Param("id") id: string, @Body() body: permissionDto.UpdatePermissionDto) {
        const permission = await this.permissionService.updatePermission(id, {
            name: body.name,
            description: body.description
        });
        return permission;
    }
}

