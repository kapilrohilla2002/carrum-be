import { Body, Controller, Get, Param, Post, Put, UsePipes } from "@nestjs/common";
import RolesService from "../services/role.service";
import * as roleDto from "../validator/role.dto";
import ZodValidationPipe from "src/common/pipes/zodValidation.pipe";

@Controller("/auth/roles")
export class RoleController {
    constructor(private readonly rolesService: RolesService) { }

    @Post()
    @UsePipes(new ZodValidationPipe(roleDto.createRoleBodySchema))
    async createRole(@Body() body: roleDto.CreateRoleDto) {
        const role = await this.rolesService.createRole({
            name: body.name,
            description: body.description
        });
        return role;
    }

    @Get()
    async getAllRoles() {
        const roles = await this.rolesService.getAllRoles();
        return roles;
    }

    @Get("/:id")
    async getRoleById(@Param("id") id: string) {
        const role = await this.rolesService.getRoleById(id);
        return role;
    }

    @Put("/:id")
    @UsePipes(new ZodValidationPipe(roleDto.updateRoleBodySchema))
    async updateRole(@Param("id") id: string, @Body() body: roleDto.UpdateRoleDto) {
        const role = await this.rolesService.updateRole(id, {
            name: body.name,
            description: body.description
        });
        return role;
    }
}

